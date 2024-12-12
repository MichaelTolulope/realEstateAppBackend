import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnect.js'
import userRoutes from './routes/user.route.js'

dotenv.config()
const app = express()

app.use(express.json())

// use routes
app.use("/api/user", userRoutes)



const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    dbConnect();
    console.log(`server running on port ${PORT}`);
    
})