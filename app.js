import express, { json } from 'express'
import { usersRouter } from './routes/users.js'
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.disable('x-powered-by')

// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to the server')
// })

app.use('/api/v1/users', usersRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})