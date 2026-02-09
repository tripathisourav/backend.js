const express = require('express')
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express()


app.use(express.json())  // req.body() se data red krne ke liye

app.use(cookieParser())


// “For any request that starts with /api/auth, send it to authRouter.”
app.use("/api/auth", authRouter) // authRouter ke saath aap jitni bhi api hit krna chahte ho uske liye aapko aange likhna padega /api/auth hm kuch 
// hm kuch bhi likh skte hai /api/auth ki jagah lekin phir hme api hit krne ke liye bhi whi likhna padega postman pr

module.exports = app