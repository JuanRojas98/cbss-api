import mysql from 'mysql2/promise'

const defaultConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cbss'
}
const connectionString = process.env.DATABASE_URL || defaultConfig

export const db = await mysql.createConnection(connectionString)
