import express from 'express'
import userRouter from './modules/user/user.route.js'

const app = express()
app.use(express.json())
app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

export default app