const express = require('express');
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/post.middleware')


const authRouter = express.Router()

/**
 * register route -> Post /api/auth/register
 */

authRouter.post('/register', authController.registerController)


/**
 * login route -> Post /api/auth/login
 */

authRouter.post('/login', authController.loginController)


/**
 * logout route -> Post /api/auth/get-me
 * @desc is route ka use krke frontend apne aap ko authenticate kr skta hai ki wo login hai ya nhi, agar login hai to uska data bhi mil jayega
 * @access private
 */

authRouter.get('/get-me', identifyUser, authController.getMeController)



module.exports = authRouter;


// why we don't send password in response when we register a user

// We don’t send the password back in the response after user registration because of core security and privacy principles. Sending it would create unnecessary risk without adding functional value.