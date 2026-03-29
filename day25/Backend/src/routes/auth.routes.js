const {Router} = require('express');
const User = require('../models/user.model')
const authController = require('../controllers/auth.controller')


const router = Router();

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

module.exports = router;