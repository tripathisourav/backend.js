
import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array()
    });
    next();
}



export const registerValidation =
    [
        body("username").isString().withMessage("Username must be a string"),
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 6, max: 12 }).withMessage("Password must be between 6 and 12 characters long"),
        validate
        // body("userId").isMongoId() // very imp method to check is the a valid mongoid or not 
    ]