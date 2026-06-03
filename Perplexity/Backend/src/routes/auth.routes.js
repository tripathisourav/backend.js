import { Router } from "express";
import { register, verifyEmail, login, getMe, resend } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";
import { resendLimiter } from "../middleware/rateLimit.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);


authRouter.post('/resend-email', resendLimiter, resend)

/** 
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */

authRouter.post('/login', loginValidator, login); // login route


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email", verifyEmail);


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged-in user's information
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);

export default authRouter;