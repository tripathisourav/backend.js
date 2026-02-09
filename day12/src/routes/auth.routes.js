const express = require('express')
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken") //npm i jsonwebtoken 
const authRouter = express.Router()
// This defines a route relative to the router, not the app.
// agar aap ko app.js file ke alawa or kisi file mein routes create krni hai toh aapko express router ka use krna padega


// -> /api/auth/register to hit this api
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body


    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email adress"
        })
    }


    const user = await userModel.create({
        email,
        password,
        name
    })

    const token = jwt.sign(
        {
            id: user._id,  // user data
            email: user.email
        },
        process.env.JWT_SECRET // jwt token
    ) // generally hm user data mein sirf user ki id deta hai

    // after registering this is user token
    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODk2YWQzMGQxZTlhNWFhMDIzNTVkNiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc3MDYxMzQ1OX0.RieA8Em_y_3ghWmvmxxfG9qkaJazx-k3xvYiJnrwWUY"
    // jwt.io pe jaake token ko decode kr skte hai


    res.cookie("jwt_token", token)
    // serevr token create krne ke baad token ko set krdega cleint ki cookie mein
    // ab client jb bhi req krega server khud hi cookies pe jaake token ko padh lega

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })
})

module.exports = authRouter


// token bnne ke baad user ab jitni bhi req krega server pe toh wha uska token bhi saath jayega

// cookies storage ki direct accsess server pe rehti hai


// token sirf do jagah create hota hai jb user login krta hai or jb user register krta hai