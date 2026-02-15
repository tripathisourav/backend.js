const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username already exists"],
        required: [true, "username is required"]
    },
    email:{
        type: String,
        unique: [true, "email already exists"],
        required: [true, "email is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/yotm0kiwn/defaultUser.webp"
    }
})


const userModel = mongoose.model("instaUsers", userSchema);

module.exports = userModel