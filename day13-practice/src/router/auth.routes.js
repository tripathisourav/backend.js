const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()


const crypto = require('crypto')

// api/auth/reigister
authRouter.post('/register', async (req, res) => {
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists with this email"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        name,
        email, 
        password:hash
    })


    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )


    res.cookie('jwt_token', token)


    res.status(200).json({
        message:"user registered successfully",
        user,
        token
    })
})




// api/auth/login
authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message: "no user found with this email"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex');
    
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET
    )


    res.cookie('jwt_token', token)


    res.status(200).json({
        message:"user loggedin successfully",
        user,
        token
    })
})  


module.exports = authRouter;