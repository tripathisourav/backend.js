const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({  
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instaUsers",
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instaUsers",
        required: true
    }
}, { timestamps: true }) // createdAt, updatedAt btata hai

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel

// followModel me hmne follower aur following dono ko ObjectId type banaya hai aur unka reference userModel ke instaUsers collection se diya hai. iska matlab ye hai ki followModel me jo follower aur following ka data hoga wo userModel ke instaUsers collection ke data se linked hoga.