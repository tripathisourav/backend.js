// controllers/auth.controller.js
// 1. registerController -> for registering a user
// 2. loginController -> for logging in a user
// 3. getMeController -> for getting the details of the logged in user

const userModel = require('../models/user.model');
// const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    // const isUserExistsByEmail = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message: "user already exists with same email"
    //     })
    // }


    // const isUserExistsByUsername = await userModel.findOne({username})

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message: "user already exists with similar Username"
    //     })
    // }



    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: `user already exists ${isUserAlreadyExists.email === email ? "with similar email" : "with similar username"}`
            // user: isUserAlreadyExists
        })
    }


    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        // password: crypto.createHash('md5').update(password).digest('hex')
        password: await bcrypt.hash(password, 10) // salt -> 10 layers of hashing
    })


    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function loginController(req, res) {
    const { username, email, password } = req.body;


    // const { username: a, email: undefined, password: test } agar email diya toh

    const user = await userModel.findOne({
        $or: [
            {
                username: username /* a */
                // ye query chalegi kyoki kisi user ki email undefined hogi nhi database mein jo woh search karega toh woh bs name dekega user exists with this name or not
            }, // username de rha ho toh username ke basis pe dhudh aayo
            {
                email: email /* undefined */
            } // email de rha ho toh email ke basis pe dhudh lo
        ]
    }).select("+password") // password field ko explicitly select kr rhe hai kyuki hmne user model me password field ka select:false kr diya tha taki by default password field select na ho jab bhi hum user data query kare database se. lekin login ke time pe hme password field ka data chahiye hota hai user ko authenticate karne ke liye isliye yaha pe explicitly password field ko select kr rhe hai taki hme login ke time pe password field ka data mil jaye.

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password invalid"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    )

    res.clearCookie("token")

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
    })

    // res.cookie("token", token)

    res.status(200).json({
        message: "User loggedin successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User found successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}



