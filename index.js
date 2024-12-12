import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnect.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())

// use routes
app.use("/api/user", userRoutes)



const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    dbConnect();
    console.log(`server running on port ${PORT}`);
    
})