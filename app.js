import express, {json, urlencoded} from 'express'
import 'dotenv/config'
import {corsMiddleware} from './middlewares/cors.js'
import {usersRouter} from './routes/users.js'
import {tablesRouter} from './routes/tables.js'
import {productsRouter} from './routes/products.js'
import {shiftsRouter} from './routes/shifts.js'
import {salesRouter} from './routes/sales.js'

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(corsMiddleware())
app.use(urlencoded({extended: true}))
app.disable('x-powered-by')

const url_api = '/api/v1'

app.use(`${url_api}/users`, usersRouter)
app.use(`${url_api}/tables`, tablesRouter)
app.use(`${url_api}/products`, productsRouter)
app.use(`${url_api}/shifts`, shiftsRouter)
app.use(`${url_api}/sales`, salesRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})