const express = require('express')
const cookieParser = require('cookie-parser')


const app = express()

// express by default req.body se data nhi padh skta iske liye hme middleware lgta hai
app.use(express.json()) // sirf raw data format read kr pata hai
app.use(cookieParser())




// require routes 
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/follow.route')


// use routes
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)  // form-data format for sending files
app.use('/api/users', userRouter)  




module.exports = app;




// 4 layers of valiidation
// 1. client side validation -> frontend me form submit krne se pehle data validate krna
// 2. server side validation -> backend me data receive hone ke baad validate krna
// 3. database level validation -> database me data store hone se pehle validate krna
// 4. authentication and authorization -> user ko authenticate krna aur uske permissions check krna ki wo kya kya access kr skta hai