import rateLimit from "express-rate-limit";

export const resendLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    message: {
        success:false,
        message:"Too many resend requests. Try again after 15 minutes."
    }
});