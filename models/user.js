import {db} from '../database/conn.js'

export class UserModel {
    static async getUsers() {
        const [users] = await db.query(
            'SELECT id, name, email, active FROM users;',
        )

        return users
    }

    static async getUserById({id}) {
        const [user] = await db.query(
            'SELECT * FROM users WHERE id = ?;',
            [id]
        )

        if (user.length === 0) return null

        return user[0]
    }

    static async getUserByEmail({email}) {
        const [user] = await db.query(
            'SELECT * FROM users WHERE email = ?;',
            [email]
        )

        if (user.length === 0) return null

        return user[0]
    }

    static async createUser({body}) {
        const {name, email, password} = body

        let sql = 'INSERT INTO users(name, email, password) VALUES(?, ?, ?);'
        let params = [name, email, password]
        const resultInsert = await db.query(sql, params)

        console.log(resultInsert[0].insertId)
        return resultInsert[0].insertId
    }

    static async updateUser({id, body}) {
        let sql = 'UPDATE users SET ? WHERE id = ?;'
        let params = [body, id]

        const resultUpdate = await db.query(sql, params)
        return resultUpdate[0]
    }
}