const express = require('express')
const postRouter = express.Router()
const allPostsController = require('../controllers/post.controller')
const multer = require('multer') // multer package read documentation
const upload = multer({ storage: multer.memoryStorage() })




// we use cloud storage provider because they cost less in comparision to server


postRouter.post('/', upload.single("krsnaImg") , allPostsController.PostController)



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