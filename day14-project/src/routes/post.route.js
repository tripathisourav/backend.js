const express = require('express')
const postRouter = express.Router()
const allPostsController = require('../controllers/post.controller')
const multer = require('multer') // multer package read documentation -> it its used because express.json() can't read form-data by default
const upload = multer({ storage: multer.memoryStorage() }) // temporary storage
const identifyUser = require('../middlewares/auth.middleware')







// server temporarily file apne pass store krke rkhta hai jaise hi files cloud storage provider ke pass pahuch jaati hai server file ko hta deta hai


// we use cloud storage provider because they cost less in comparision to server
// we will use imagekit cloude storage provider provides files to users if they want access

// we compress our images alot to save bandwidth as it costs a lot  


/*
* POST /api/posts [protected - sirf woh user req kr skte hai jinpe token hoga]
* - req.body = { caption,image-file }
*/




postRouter.post('/', identifyUser, upload.single("krsnaImg") , allPostsController.PostController)   

// jis naam se frontend file ko bhejega whi naam yha likha hona chaiye 


/*
* GET /api/posts/ [protected]
*/


postRouter.get('/', identifyUser, allPostsController.getPostController)



/*
* GET /api/posts/details/:postid [protected]
* - return an detail about specific post with id. also check whether the post belongs to the user that is requesting
*/



postRouter.get('/details/:postId', identifyUser, allPostsController.getPostDetailsController)









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