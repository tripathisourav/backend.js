
import { body, validationResult } from 'express-validator'

const validate = (req, res, next) => {
    const errors = validationResult(req) // Extracts the validation errors of an express request

    if (errors.isEmpty()) {
        return next()
    }

    res.status(400).json()({
        errors: errors.array()
    });
    next();
}


export const registerValidation = [
    body('username').isString().withMessage('username must be a string'),
    body('email').isEmail().withMessage('invalid email format'),
    body('password').isLength({ min: 6, max: 12 }).matches()
]