const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");





async function followUserController(req, res) {

    try {

        const followerId = req.user.id
        const followingId = req.params.userId

        if (followerId === followingId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            })
        }

        const followee = await userModel.findById(followingId)

        if (!followee) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isAlreadyRequested = await followModel.findOne({
            follower: followerId,
            following: followingId
        })

        if (isAlreadyRequested) {
            return res.status(409).json({
                message: "Follow request already exists"
            })
        }

        const followRecord = await followModel.create({
            follower: followerId,
            following: followingId,
            status: "pending"
        })

        res.status(201).json({
            message: "Follow request sent",
            follow: followRecord
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

async function acceptFollowController(req, res) {
    const followId = req.params.id

    const follow = await followModel.findOneAndUpdate(
        {
            _id: followId,
            following: userId
        },
        { status: "accepted" },
        { new: true }
    )

    if (!follow) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    res.json({
        message: "Follow request accepted",
        follow
    })
}

async function rejectFollowController(req, res) {

    const followId = req.params.id

    const follow = await followModel.findByIdAndUpdate(
        followId,
        { status: "rejected" },
        { new: true }
    )

    res.json({
        message: "Follow request rejected",
        follow
    })
}

// Query meaning:
// people who requested to follow me

async function getPendingRequests(req, res) {

    const userId = req.user.id

    const requests = await followModel.find({
        following: userId,
        status: "pending"
    }).populate("follower", "username profileImage")

    res.json({
        requests
    })
}

async function unfollowUserController(req, res) {

    try {

        const followerId = req.user.id
        const followingId = req.params.userId

        if (followerId === followingId) {
            return res.status(400).json({
                message: "You cannot unfollow yourself."
            })
        }

        const followee = await userModel.findById(followingId)

        if (!followee) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isAlreadyFollowing = await followModel.findOne({
            follower: followerId,
            following: followingId,
            status: "accepted"
        })

        if (!isAlreadyFollowing) {
            return res.status(200).json({
                message: "You are not following this user"
            })
        }

        await followModel.findOneAndDelete({
            follower: followerId,
            following: followingId
        })

        res.status(200).json({
            message: "User unfollowed successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }

}

module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequests,
    acceptFollowController,
    rejectFollowController
}