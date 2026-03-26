const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({  
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instaUsers",
        required: [true, "Follower is required"]
        // type: String,
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instaUsers",
        required: [true, "followee is required"]
        // type: String,
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted or rejected"
        },
    },
}, { timestamps: true }) // createdAt, updatedAt btata hai


followSchema.index({ follower: 1, following: 1 }, { unique: true }) // isse ye hoga ki ek user ek dusre user ko sirf ek baar hi follow kr payega.

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel

// followModel me hmne follower aur following dono ko ObjectId type banaya hai aur unka reference userModel ke instaUsers collection se diya hai. iska matlab ye hai ki followModel me jo follower aur following ka data hoga wo userModel ke instaUsers collection ke data se linked hoga.

// follow model ke collection ke andar documents hote hai