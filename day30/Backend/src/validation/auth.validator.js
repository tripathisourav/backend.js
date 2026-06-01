
import { body, validationResult } from "express-validator";  // npm i express-validator

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
        // body("password").isLength({ min: 6, max: 12 }).withMessage("Password must be between 6 and 12 characters"),
        // body("password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/).withMessage("Password must be between 6 and 12 characters and contain at least one letter and one number"),
        body("password").custom((value) => {
            if (value.length < 6 || value.length > 12) {
                throw new Error("Password must be between 6 and 12 characters");
            }
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
            if (!passwordRegex.test(value)) {
                throw new Error("Password must contain at least one letter and one number");
            }
            return true;
        }).withMessage("Invalid password format"),
        validate
        // body("userId").isMongoId() // very imp method to check is the a valid mongoid or not 
        
    ]