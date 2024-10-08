

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userOuth from './route/userOuth.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect with mongoose")
}).catch((err)=>{
    console.log(err)
})

 const app =express()
 app.use(express.json())
app.use(cookieParser())

 app.use('/api/user',userOuth)


 app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message =err.message || "Internal server Error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
 })

 app.listen(5000,()=>{
    console.log("Server is running on port 5000")
 })