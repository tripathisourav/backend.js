const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')

const app = express()

// express by default req.body se data nhi padh skta iske liye hme middleware lgta hai
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)  // form-data format for sending files




module.exports = app;