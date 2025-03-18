const express=require("express")
require("dotenv").config()
const cors=require("cors")
const mongoose=require("mongoose")
const ConnectDB=require('./config/db')
const router=require('./routes/index')
const app=express()
const cookieParser=require('cookie-parser')

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(cookieParser())
app.use('/api',router)

const PORT=8000|| process.env.PORT
ConnectDB().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log("Server is running on",+PORT);
    })
})
