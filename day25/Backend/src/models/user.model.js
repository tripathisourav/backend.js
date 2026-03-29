const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    }
})



// userSchema.pre('save', function(next){
//     if(this.password && this.isModified('password')){
//         this.password = this.password.split('').reverse().join('')
//     }   
//     next();
// })

// userSchema.post('save', function(doc, next){
//     console.log('User saved successfully');
//     next();
// })

module.exports = mongoose.model('User', userSchema)