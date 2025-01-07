import { db } from '../database/conn.js'

export class TableModel {
    static async getTables() {
        const [tables] = await db.query(
            'SELECT * FROM tables;',
        )

        return tables
    }

    static async getTable({ id }) {
        const [table] = await db.query(
            'SELECT * FROM tables WHERE id = ?;',
            [id]
        )

        if ( table.length === 0 ) return null

        return table
    }

    static async createTable({ body }) {
        const {name, active} = body

        let sql = 'INSERT INTO tables(name, active) VALUES(?, ?);'
        let params = [name, active]
        const resultInsert = await db.query(sql, params)

        console.log(resultInsert)
        return resultInsert[0].insertId
    }

    static async updateTable({ id, body }) {
        let sql = 'UPDATE tables SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        console.log(resultUpdate)
        return resultUpdate[0]
    }
}