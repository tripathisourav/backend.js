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
    },
    // 274 mil virat kohli's followers
    // 274 mil id's
    // 1 id -> 12bytes => 274 mil 8 12 bytes -> 3.288 GB storage for followers list of virat kohli  
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,   
            ref: "instaUsers"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,   
            ref: "instaUsers"
        }
    ]
})


const userModel = mongoose.model("instaUsers", userSchema);

module.exports = userModel


// 1 user/post ke data ko hm document bolte hai aur unhe collection me store karte hai. collection is a group of documents and database is a group of collections. 

// aisi collection jo do documents ke beech mein relation bta de use hm edge collection bolte hai. jaise user collection aur post collection ke beech mein relation bta de ki konsa user ne konsa post banaya hai toh uske liye hm edge collection banayenge.