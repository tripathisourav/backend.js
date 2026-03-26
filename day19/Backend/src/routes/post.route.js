const express = require('express')
const postRouter = express.Router()
const allPostsController = require('../controllers/post.controller')
const multer = require('multer') // multer package read documentation -> it its used because express.json() can't read form-data by default
const upload = multer({ storage: multer.memoryStorage() }) // temporary storage
const identifyUser = require('../middlewares/post.middleware')
const { post } = require('./auth.route')







// server temporarily file apne pass store krke rkhta hai jaise hi files cloud storage provider ke pass pahuch jaati hai server file ko hta deta hai


// we use cloud storage provider because they cost less in comparision to server
// we will use imagekit cloud storage provider provides files to users if they want access

// we compress our images alot to save bandwidth as it costs a lot  







/*
* POST /api/posts [protected - sirf woh user req kr skte hai jinpe token hoga]
* - req.body = { caption,image-file }
*/




postRouter.post('/', identifyUser, upload.single("Img") , allPostsController.PostController)   

// jis naam se frontend file ko bhejega whi naam yha likha hona chaiye 


/*
* GET /api/posts/ [protected]
* @description - return all posts of the user who is requesting, sorted by createdAt in descending order
*/


postRouter.get('/', identifyUser, allPostsController.getPostController)



/*
* GET /api/posts/details/:postid [protected]
* @description - return an detail about specific post with id. also check whether the post belongs to the user that is requesting
*/



postRouter.get('/details/:postId', identifyUser, allPostsController.getPostDetailsController)




/**
 * @route POST /api/posts/like/:postId
 * @description Like a post with the given postId. The user must be authenticated to like a post. If the post is already liked by the user, it will return a message indicating that the post is already liked.
 * @access Private
 */

postRouter.post('/like/:postId', identifyUser, allPostsController.likePostController)

/**
 * @route POST /api/posts/unlike/:postId
 * @description Unlike a post with the given postId. The user must be authenticated to unlike a post. If the post is not liked by the user, it will return a message indicating that the post is not liked yet.
 * @access Private
 */

postRouter.post('/unlike/:postId', identifyUser, allPostsController.unlikePostController)



/**
 * @route Get /api/posts/feed
 * @description Get the feed of the user. The feed should contain posts from the users that the current user is following. The posts should be sorted by createdAt in descending order.
 * @access Private
 */


postRouter.get('/feed', identifyUser, allPostsController.getFeedController)



module.exports = postRouter;







// Disk Storage -> stores permanently in server
// Memory Storage -> stores temporarly in server



// We use cloud storage instead of local server storage because it provides:

// Better scalability

// Higher availability

// Built-in redundancy

// Global delivery performance

// Lower operational burden

// Better concurrency handling

// Stronger durability guarantees

// Pay-as-you-go pricing








// Multer is an Express middleware used to handle file uploads

// It parses requests with multipart/form-data (used when uploading files from forms or APIs)

// Default Express body parsers cannot read file data — Multer fills this gap

// It extracts uploaded files and makes them available as req.file or req.files

// It can store files on disk or in memory

// It also keeps normal form fields available in req.body

// Commonly used for uploading images, documents, videos, etc.