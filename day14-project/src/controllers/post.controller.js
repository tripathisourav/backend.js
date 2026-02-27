const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')




const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})






async function PostController(req, res) {
    // console.log(req.body); // undefined if we don't use multer
    // [Object: null prototype] { caption: 'test_caption' }

    console.log(req.body, req.file);

    // { caption: 'test_caption' } {
    //     fieldname: 'krsnaImg',
    //         originalname: 'dollar sign.jpeg',
    //             encoding: '7bit',
    //                 mimetype: 'image/jpeg',
    //                     buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 08 08 08 08 09 08 09 0a 0a 09 0d 0e 0c 0e 0d 13 11 10 10 11 13 1c 14 16 14 ... 48302 more bytes >,
    //                         size: 48352  // content in which file is stored in ssd
    // }





    // this block of code is repeating multiple times so we will just create an middleware so that we have to only write it at a place and can use it everywhere

    // {
    //     const token = req.cookies.token

    //     if (!token) {
    //         return res.status(401).json({
    //             message: "Token not provided, Unauthorized access"
    //         })
    //     }

    //     let decoded = null;
    //     try {
    //         decoded = jwt.verify(token, process.env.JWT_SECRET) // agar token doctored hua toh hmara verify method error dega 
    //         // json web token error invalid signature (500 internal server error)
    //         console.log(decoded);

    //     } catch (err) {
    //         return res.status(401).json({
    //             message: "user not authorized"
    //         })
    //     }
    // }



    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort2-instaClone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })


    res.status(201).json({
        message: "Post created successfully.",
        post
    })


    // res.send(file) // imagekit provides thumbnail 
}

// jis user ne login kiya hoga uss user ki saari posts dikhengi
async function getPostController(req, res) {



    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })

}



async function getPostDetailsController(req, res) {


    const userId = req.user.id
    const postId = req.params.postId;

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not Found."
        })
    }

    // 403 Forbidden is used when the server understands the client's request but refuses to authorize it, even if the client is authenticated.
    if (post.user.toString() !== userId) {
        return res.status(403).json({
            user: post.user,
            userId: userId,
            message: "forbidden content."
        })
    }


    return res.status(200).json({
        message: "post fetched Successfully",
        post
    })
}


module.exports = {
    PostController,
    getPostController,
    getPostDetailsController
}

// day 105 task read about indexing and edge collection