const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')
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

async function likePostController(req, res) {
    const user = req.user.id
    const postId = req.params.postId    
    const post = await postModel.findById(postId) // agar postId galat hua toh post null aayega aur agar postId sahi hua toh post me uss post ka data aayega

    if (!post) {
        return res.status(404).json({
            message: "Post not Found."
        })
    }   

    // if (post.user.toString() === userId) {
    //     return res.status(400).json({
    //         message: "You cannot like your own post."
    //     })
    // }

    // likeModel -> postId, userId
    // likeModel me ek unique index create krna hoga jisme postId aur userId dono honge taki ek user ek post ko sirf ek baar hi like kr paye.   

    // likeModel me postId aur userId dono ObjectId type ke honge aur unka reference postModel ke posts collection aur userModel ke instaUsers collection se diya hoga. iska matlab ye hai ki likeModel me jo postId aur userId ka data hoga wo postModel ke posts collection aur userModel ke instaUsers collection ke data se linked hoga. isse hume ye ensure krna hoga ki like create krne se pehle hi ye check kr le ki postId aur userId valid hai ya nahi.

    const isAlreadyLiked = await likeModel.findOne({post: postId, user})
    // console.log(isAlreadyLiked);

    if(isAlreadyLiked){
        return res.status(409).json({
            message: "user already liked this post",
            like: isAlreadyLiked
        })
    }


    const like = await likeModel.create({
        post: postId,
        user: user
    })

    res.status(201).json({
        message: "Post liked successfully.",
        like
    })
}


async function unlikePostController(req, res){
    const postId = req.params.postId
    const user = req.user.id

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(409).json({
            message: "post not Found"
        })
    }

    const isPostLiked = await likeModel.findOne({post: postId, user})

    if(!isPostLiked){
        return res.status(409).json({
            message: "post can't be unliked as it isn't liked"
        })
    }


    await likeModel.findOneAndDelete({_id: isPostLiked._id})

    return res.status(200).json({
        message: "Successfull unlike request"
    })
}
    

async function getFeedController(req, res){

    // const posts = await postModel.find().populate("user", "username profileImage").sort({createdAt: -1}) // populate ka use krke hum postModel ke user field me se username field ko populate krwa rhe hai taki hume frontend me post ke sath sath uss post ko kisne banaya uska username bhi mil jaye. sort({createdAt:-1}) ka use krke hum posts ko createdAt ke hisab se descending order me sort kr rhe hai taki sabse naye post sabse pehle aaye.


    // why two users object id is never same ?
    // ObjectId is generated using a combination of timestamp, machine identifier, process identifier and a counter. the timestamp ensures that ObjectIds generated at different times are unique. the machine identifier ensures that ObjectIds generated on different machines are unique. the process identifier ensures that ObjectIds generated by different processes on the same machine are unique. the counter ensures that ObjectIds generated within the same second on the same machine by the same process are unique. due to this combination of factors, it is highly unlikely for two ObjectIds to be the same, even if they are generated at the same time.


    const user = req.user

    // _id is created in such a manner that it contains the timestamp of when the document was created. so by sorting the posts by _id in descending order we are actually sorting the posts by createdAt in descending order. isliye hum sort({ _id: -1 }) ka use kr rhe hai taki hume createdAt ke hisab se descending order me posts mil jaye.
    const posts = await Promise.all((await postModel.find().populate("user").sort({_id: -1}).lean()) // lean ka use krke hum postModel ke documents ko plain javascript objects me convert kr rhe hai taki hum unme naye fields add kr ske jaise ki isLiked field jo ki ye batayega ki kya current user ne is post ko like kiya hai ya nahi. agar hum lean() ka use nahi krte hai toh hume postModel ke documents me naye fields add krne ke liye unhe pehle plain javascript objects me convert krna padega jo ki thoda sa extra code likhne ko milega. lean() ka use krne se hume directly plain javascript objects mil jate hai jisme hum asani se naye fields add kr skte hai.
    .map(async(post) => {

        /**
         * typeof post -> mongooseObject
         */

        const isLiked = await likeModel.findOne({
            post: post._id,
            user: user.id
        })

        post.isLiked = !!isLiked

        return post
    }))

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })

}



module.exports = {
    PostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unlikePostController,
    getFeedController
}

// day 105 task read about indexing and edge collection