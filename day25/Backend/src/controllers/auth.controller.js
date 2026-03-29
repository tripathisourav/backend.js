const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })


    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET, { expiresIn: '3d' }
    )


    res.cookie('token', token)


    return res.status(201).json({
        message: "User Registered Successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function loginUser(req, res) {
    const { email, username, password } = req.body;

    const User = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(!User){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id: User._id,
            username: User.username
        },
        process.env.JWT_SECRET, { expiresIn: '3d' }
    )

    res.cookie('token', token)

    return res.status(200).json({
        message: "User Logged In Successfully",
        user:{
            id: User._id,
            username: User.username,
            email: User.email
        }
    })
}


module.exports = {
    registerUser,
    loginUser
}