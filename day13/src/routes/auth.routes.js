const express = require('express')
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken") //npm i jsonwebtoken 
const authRouter = express.Router()

// This defines a route relative to the router, not the app.
// agar aap ko app.js file ke alawa or kisi file mein routes create krni hai toh aapko express router ka use krna padega

const crypto = require('crypto');

// -> /api/auth/register to hit this api
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body


    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        // Conflict: (409) The request could not be completed due to a conflict with the state of the resource. 
        return res.status(409).json({
            message: "User already exists with this email adress"
        })
    }


    const hash = crypto.createHash('md5').update(password).digest('hex');

    const user = await userModel.create({
        email,
        password: hash,
        name
    })

    const token = jwt.sign(
        {
            id: user._id,  // user data
            email: user.email // token ke andar generally hm senstive data nhi rkhte token ke andar bs user ki id hoti hai
        },
        process.env.JWT_SECRET // jwt token
    ) // generally hm user data mein sirf user ki id deta hai

    // after registering this is user token
    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODk2YWQzMGQxZTlhNWFhMDIzNTVkNiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc3MDYxMzQ1OX0.RieA8Em_y_3ghWmvmxxfG9qkaJazx-k3xvYiJnrwWUY"
    // jwt.io pe jaake token ko decode kr skte hai


    res.cookie("jwt_token", token) // cookie hamesha client side pe stored rehti hai (browser ya postman)
    // serevr token create krne ke baad token ko set krdega cleint ki cookie mein
    // ab client jb bhi req krega server khud hi cookies pe jaake token ko padh lega

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })
})


authRouter.post('/protected', (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "This is protected route"
    })
})


// the callback is called controller it executes only when req comes on this api

authRouter.post('/login', async (req, res) => {

    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user) {
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex');

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign(
        {
            id : user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user
    })
})


// A data breach occurs when confidential, sensitive, or protected information is accessed, stolen, or exposed without authorization.

// MD5 hash generator 
// same input ka same output
// - sheryians(plain text) -> 431a106e401eaf9504e1e2199309f1c3(hash)
// one way only - plain text hash mein easily convert ho skta hai lekin hash plain text mein easily convert nhi ho skta





module.exports = authRouter


// token bnne ke baad user ab jitni bhi req krega server pe toh wha uska token bhi saath jayega

// cookies storage ki direct accsess server pe rehti hai

// cookie storage ki do property hoti hai pehla aapka server kuch bhi phad skta hai cookie storage se dusra kuch bhi likh skta hai cookie storage mein

// token sirf do jagah create hota hai jb user login krta hai or jb user register krta hai