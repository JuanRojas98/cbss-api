import {db} from '../database/conn.js'

export class CategoryModel {
    static async getCategories() {
        const [categories] = await db.query(
            `SELECT *
             FROM categories`
        )

        return categories
    }

    static async getCategory({id}) {
        const [category] = await db.query(
            'SELECT * FROM categories WHERE id = ?;',
            [id]
        )
        if (category.length === 0) return null

        return category
    }

    static async createCategory({body}) {
        const {name} = body

        let sql = 'INSERT INTO categories(name) VALUES(?);'
        let params = [name]
        const resultInsert = await db.query(sql, params)

        return resultInsert[0].insertId
    }

    static async updateCategory({id, body}) {
        let sql = 'UPDATE categories SET ? WHERE id = ?;'
        let params = [body, id]
        const resultUpdate = await db.query(sql, params)

        return resultUpdate[0]
    }
}