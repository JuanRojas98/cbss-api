import {db} from '../database/conn.js'

export class ShiftModel {
    static async getShifts() {
        const [shifts] = await db.query(
            `SELECT *
             FROM shifts`
        )

        return shifts
    }

    static async getShift({id}) {
        const [shift] = await db.query(
            'SELECT * FROM shifts WHERE id = ?;',
            [id]
        )

        if (shift.length === 0) return null

        return shift
    }

    static async createShift({body}) {
        const {user_id} = body

        let sql = 'INSERT INTO shifts(user_id) VALUES(?);'
        let params = [user_id]
        const resultInsert = await db.query(sql, params)
        const [shift] = await this.getShift({id: resultInsert[0].insertId})

        return shift
    }

    static async updateShift({id, body}) {
        let sql = 'UPDATE shifts SET endDate = NOW() WHERE id = ?;'
        let params = [id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}