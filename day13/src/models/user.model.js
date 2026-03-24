const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "With this email user already exists"]
    },
    password: String,
})


// You already used unique in the schema, so this index line is technically redundant.
// userSchema.index({ email: 1 }, { unique: true })

{
// This creates a database index on email.

// Why index?

// Without index:

// MongoDB scans every document to find email.

// With index:

// MongoDB directly jumps to the email value.

// So this line:

// Creates an index on email

// Ensures email is unique

// 1 means ascending index.
}

const userModel = mongoose.model('users', userSchema)

module.exports = userModel


// This code creates a MongoDB user model with fields (name, email, password) and ensures email is unique using an index.