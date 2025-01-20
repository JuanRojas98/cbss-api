import {db} from '../database/conn.js'

export class TableModel {
    static async getTables() {
        const [tables] = await db.query(
            `SELECT
                 t.id,
                 t.name,
                 CASE
                     WHEN ( SELECT COUNT(*) FROM sales s WHERE s.table_id = t.id ) > 0 THEN 0
                     ELSE 1
                 END AS available
             FROM tables t
             WHERE t.active = 1`,
        )

        return tables
    }

    static async getTable({id}) {
        const [table] = await db.query(
            'SELECT * FROM tables WHERE id = ?;',
            [id]
        )

        if (table.length === 0) return null

        return table
    }

    static async createTable({body}) {
        const {name} = body

        let sql = 'INSERT INTO tables(name) VALUES(?);'
        let params = [name]
        const resultInsert = await db.query(sql, params)

        return resultInsert[0].insertId
    }

    static async updateTable({id, body}) {
        let sql = 'UPDATE tables SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}