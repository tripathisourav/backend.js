const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const crypto = require('crypto')


authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create(
        {
            name,
            email,
            password: crypto.createHash('md5').update(password).digest('hex')
        }
    )


    const token = jwt.sign(
        {
            id:user._id,
            email: user.email
        },
        process.env.JWT_SECRET, { expiresIn: "1h" } // 1 hr mein token expire ho jayega
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        success: true,
        message: 'user registered successfully',
        user
    })
})


authRouter.get('/get-me', async(req, res) => {
    const token = req.cookies.jwt_token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded);

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message:"successfull request",
        user
    })
})


authRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;
        const user = await userModel.findOne({ email})
        if (!user) {
            return res.status(409).json({
                message: 'no user exists with this email'
            })
        }

        const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

        if(!isPasswordMatched){
            res.status(401).json({
                message: "wrong password credentials"
            })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie('jwt_token', token)

        res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            token
        })
})


module.exports = authRouter;