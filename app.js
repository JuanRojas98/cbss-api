import express, {json} from 'express'
import 'dotenv/config'
import {usersRouter} from './routes/users.js'
import {tablesRouter} from './routes/tables.js'
import {productsRouter} from "./routes/products.js";

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.disable('x-powered-by')

const url_api = '/api/v1'

app.use(`${url_api}/users`, usersRouter)
app.use(`${url_api}/tables`, tablesRouter)
app.use(`${url_api}/products`, productsRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})