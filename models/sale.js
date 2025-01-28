import {db} from '../database/conn.js'
import {MovementModel} from "./movement.js";
import {ProductModel} from "./product.js";

export class SaleModel {
    static async getSales() {
        const [sales] = await db.query(
            `SELECT *
             FROM sales`
        )

        return sales
    }

    static async getSale({id}) {
        const [sale] = await db.query(
            `SELECT
                s.id,
                s.shift_id,
                s.table_id,
                (
                    SELECT
                        CAST( SUM( si.quantity * p.price ) AS UNSIGNED )
                    FROM sales_items si
                             LEFT JOIN products p ON si.product_id = p.id
                    WHERE si.sales_id = s.id
                ) AS total_sale,
                s.user_id,
                st.state,
                s.created,
                s.updated
            FROM sales s
                LEFT JOIN states st ON s.state_id = st.id
            WHERE s.id = ?`,
            [id]
        )

        if (sale.length === 0) return null

        const [sale_items] = await db.query(
            `SELECT
                i.product_id,
                p.name,
                i.quantity,
                ( i.quantity * p.price ) AS total_value
            FROM sales_items i
                LEFT JOIN sales s ON i.sales_id = s.id
                LEFT JOIN products p on i.product_id = p.id
            WHERE s.id = ${id}`
        )

        sale[0].items = sale_items
        return sale
    }

    static async createSale({body}) {
        const {shift_id, table_id, user_id, state_id, products} = body

        let sql = 'INSERT INTO sales(shift_id, table_id, user_id, state_id) VALUES(?,?,?,?);'
        let params = [shift_id || null, table_id || null, user_id, state_id]
        const resultInsert = await db.query(sql, params)

        const sale_id = resultInsert[0].insertId

        for (let product of products) {
            const {id, quantity} = product

            // Registro del producto asociado a la venta
            let sql2 = 'INSERT INTO sales_items(sales_id, product_id, quantity) VALUES(?,?,?);'
            let params2 = [sale_id, id, quantity]
            const resultInsert2 = await db.query(sql2, params2)

            // Registro del movimiento del producto asociado a la venta
            const movProduct = await MovementModel.createMovement({body: {product_id, user_id, movement_type: 2, quantity, sale_id}})

            // Actualizar la cantidad del producto asociado a la venta
            const productInfo = await ProductModel.getProduct({id: product_id})
            let newQuantity = parseInt( productInfo[0].quantity ) - quantity
            const updateProduct = await ProductModel.updateProduct({id: product_id, body: {quantity: newQuantity}})
        }

        return sale_id
    }

    static async updateSale({id, body}) {
        let sql = 'UPDATE sales SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}