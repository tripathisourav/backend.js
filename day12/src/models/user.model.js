const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "With this email user already exists"]
    },
    password: String,
})

// userSchema.index({ email: 1 }, { unique: true })

const userModel = mongoose.model('users', userSchema)

module.exports = userModel