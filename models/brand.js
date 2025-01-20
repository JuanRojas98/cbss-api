import {db} from '../database/conn.js'

export class BrandModel {
    static async getBrands() {
        const [categories] = await db.query(
            `SELECT *
             FROM brands`
        )

        return categories
    }

    static async getBrand({id}) {
        const [category] = await db.query(
            'SELECT * FROM brands WHERE id = ?;',
            [id]
        )

        if (category.length === 0) return null

        return category
    }

    static async createBrand({body}) {
        const {name} = body

        let sql = 'INSERT INTO brands(name) VALUES(?);'
        let params = [name]
        const resultInsert = await db.query(sql, params)

        return resultInsert[0].insertId
    }

    static async updateBrand({id, body}) {
        let sql = 'UPDATE brands SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}