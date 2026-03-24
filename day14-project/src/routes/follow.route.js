const express = require("express");
const followController = require("../controllers/follow.controller")
const identifyUser = require("../middlewares/post.middleware")
const userRouter = express.Router()


/**
 * @route Post /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:userId", identifyUser, followController.followUserController)




/**
 * @route Post /api/users/unfollow/:userId
 * @description unFollow a user
 * @access Private
 */
userRouter.post("/unfollow/:userId", identifyUser, followController.unfollowUserController)


/**
 * @route Patch /api/users/follow/accept/:id
 * @description accept follow request
 * @access Private
 */

userRouter.patch("/follow/accept/:id", identifyUser, followController.acceptFollowController)


/** * @route Patch /api/users/follow/reject/:id
 * @description reject follow request
 * @access Private
 */

userRouter.patch("/follow/reject/:id", identifyUser, followController.rejectFollowController)


/** * @route Get /api/users/follow/requests
 * @description get pending follow requests for the logged in user
 * @access Private
 */

userRouter.get("/follow/requests", identifyUser, followController.getPendingRequests)


module.exports = userRouter;

// why we don't send password in response when we register a user
// because password is a sensitive information and should not be exposed to the client.