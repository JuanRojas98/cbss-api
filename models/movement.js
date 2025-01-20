import {db} from '../database/conn.js'

export class MovementModel {
    static async getMovements() {
        const [movements] = await db.query(
            'SELECT * FROM movements ORDER BY created DESC',
        )

        return movements
    }

    static async getMovementsProduct({id}) {
        const [movements] = await db.query(
            'SELECT * FROM movements WHERE product_id = ? ORDER BY created DESC;',
            [id]
        )

        if (movements.length === 0) return null

        return movements
    }

    static async createMovement({body}) {
        const {product_id, user_id, movement_type, quantity, sale_id} = body

        let sql = 'INSERT INTO movements(product_id, user_id, movement_type, quantity, sale_id) VALUES(?, ?, ?, ?, ?);'
        let params = [product_id, user_id, movement_type, quantity, sale_id]
        const resultInsert = await db.query(sql, params)

        return resultInsert[0].insertId
    }
}