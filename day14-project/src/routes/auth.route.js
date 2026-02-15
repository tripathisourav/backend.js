const express = require('express');
const authController = require('../controllers/auth.controller')


const authRouter = express.Router()

authRouter.post('/register', authController.registerController)



authRouter.post('/login', authController.loginController)


module.exports = authRouter;


// why we don't send password in response when we register a user

// We don’t send the password back in the response after user registration because of core security and privacy principles. Sending it would create unnecessary risk without adding functional value.