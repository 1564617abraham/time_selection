import express, {Express, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import UsersRouter from './routes/userRouter'

const app: Express = express()

const PORT = process.env.PORT || 3000

console.log(`Server environment: ${process.env.NODE_ENV}`)

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/users', UsersRouter)

app.get('/', (_req, res: Response) => {
    res.send('Node + TypeScript + Express + MongoDB server is running')
})



app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT)
})

export { app }