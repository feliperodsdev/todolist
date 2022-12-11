require('express-async-errors');
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/connect')
const loginRouter = require('./routes/login')
const userRoute = require('./routes/user')
const taskRouter = require('./routes/task')
const errorHandler = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', loginRouter)
app.use('/user', userRoute)
app.use('/task', taskRouter)
app.use(notFound)
app.use(errorHandler)

const start = () =>
{
    try
    {
        connectDb()
        app.listen(5000, () => console.log('pega fio'))
    }
    catch(e)
    {
        console.log(e)
    }
}

start()