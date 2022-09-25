const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 9000
const connectDb = require('./config/db')

const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))
