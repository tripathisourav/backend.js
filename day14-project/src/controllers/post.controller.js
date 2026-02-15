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

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET) // agar token doctored hua toh hmara verify method error dega 
        // json web token error invalid signature (500 internal server error)
        console.log(decoded);

    } catch(err){
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder:"cohort2-instaClone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })


    res.status(201).json({
        message: "Post created successfully.",
        post
    })


    // res.send(file) // imagekit provides thumbnail 
}




module.exports = {
    PostController
}