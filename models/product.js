import {db} from '../database/conn.js'

export class ProductModel {
    static async getProducts() {
        const [products] = await db.query(
            `SELECT p.id,
                p.name,
                p.description,
                p.category_id,
                c.name AS category_name,
                p.quantity,
                (
                    SELECT
                        CASE
                            WHEN SUM(si.quantity) IS NULL THEN 0
                            ELSE SUM(si.quantity)
                            END
                    FROM sales_items si
                    WHERE si.product_id = p.id
                ) AS quantity_sold,
                p.price,
                p.created
             FROM products p
                 LEFT JOIN categories c ON c.id = p.category_id`
        )

        return products
    }

    static async getProduct({id}) {
        const [product] = await db.query(
            'SELECT * FROM products WHERE id = ?;',
            [id]
        )

        if (product.length === 0) return null

        return product
    }

    static async createProduct({body}) {
        const {name, description, category_id, brand_id, quantity, price} = body

        let sql = 'INSERT INTO products(name, description, category_id, brand_id, quantity, price) VALUES(?, ?, ?, ?, ?, ?);'
        let params = [name, description, category_id, brand_id, quantity, price]
        const resultInsert = await db.query(sql, params)

        return resultInsert[0].insertId
    }

    static async updateProduct({id, body}) {
        let sql = 'UPDATE products SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}