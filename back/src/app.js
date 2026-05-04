import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import taskRouter from './modules/task/task.route.js'
import userRouter from './modules/user/user.route.js'
import authRouter from './modules/auth/auth.route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

export default app