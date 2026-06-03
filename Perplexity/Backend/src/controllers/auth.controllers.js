import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";


/** 
 * The register function is an asynchronous function that handles the registration of a new user. It takes in the request and response objects as parameters. 
 * It first extracts the username, email, and password from the request body. Then it checks if a user with the same email or username already exists in the database. 
 * If such a user exists, it returns a 400 status code with an error message. If not, it creates a new user in the database with the provided information.
 * After creating the user, it generates a JWT token for email verification and sends a verification email to the user's email address. Finally, it returns a 201 status code with a success message and the user's information (excluding the password).
 * The login function is an asynchronous function that handles the login process for a user. It takes in the request and response objects as parameters.
 * It first extracts the email and password from the request body. Then it checks if a user with the provided email exists in the database. If such a user does not exist, it returns a 400 status code with an error message.
 * If the user exists, it compares the provided password with the hashed password stored in the database using the comparePassword method defined in the user model. If the passwords do not match, it returns a 400 status code with an error message.
 * If the user's email is not verified, it returns a 400 status code with an error message indicating that the email needs to be verified before logging in. If all checks pass, it generates a JWT token for authentication and returns a 200 status code with a success message and the token.
 * The verifyEmail function is an asynchronous function that handles the email verification process for a user. It takes in the request and response objects as parameters.
 * It first extracts the token from the query parameters of the request. If the token is missing, it returns a 400 status code with an error message. If the token is present, it verifies the token using the JWT secret key.
 * If the token is valid, it extracts the email from the decoded token and checks if a user with that email exists in the database. If such a user does not exist, it returns a 400 status code with an error message.
 * If the user exists but is already verified, it returns a 400 status code with an error message indicating that the email is already verified. If the user exists and is not verified, it sets the verified field to true and saves the user document in the database.
 * Finally, it sends an HTML response to the user confirming that their email has been successfully verified.
 */



/** 
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
export async function register(req, res) {

    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({ username, email, password }) // password saved without encryption because in userModel we have pre function which will do all the hashing and stuff

    const emailVerificationToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
    );


    // const token = jwt.sign(
    //     {
    //         userId: user._id
    //     },
    //     process.env.JWT_SECRET
    // )

    // res.cookie('token', token);

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Oi</strong>. We're excited to have you on board!</p>
                <p>To get started, please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Oi Team</p>
        `
    }) // email sent contatining token made of user email jb user link pr click krega toh /api/auth/verify-email 
    // pr request pahuch jayegi token ke saath, agar email user ka nhi hoga toh woh link ko click nhi kr payega or 
    // verified nhi ho payega iss tarike se hme saare users verified milenga

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

/** 
 * Login a user and return JWT token
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
export async function login(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User with this email does not exist",
            success: false,
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect password",
            success: false,
            err: "Incorrect password"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "Email not verified. Please verify your email before logging in.",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/** 
 * Verify user's email address
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
export async function verifyEmail(req, res) {

    const { token } = req.query; // token ko nikalenga phir usse data extract krega check krega iss email se koi 
    // user hai ya nhi agar user available hoga toh user.verified ko true set kr denga phir user ke data ko save kr denga 
    if (!token) {
        return res.status(400).json({
            message: "Verification token is missing",
            success: false,
            err: "Token missing"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        if (user.verified) {
            return res.status(400).json({
                message: "Email already verified",
                success: false,
                err: "Email already verified"
            })
        }

        user.verified = true;
        await user.save();

        const html = `
            <p>Hi ${user.username},</p>
            <p>Your email has been successfully verified! You can now log in to your account and start using Oi.</p>
            <p>Best regards,<br>The Oi Team</p>
        `;

        res.send(html);

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: "Invalid token"
        })
    }

}


export async function getMe(req, res) {

    const userId = req.user.userId;

    const user = await userModel.findById(userId).select("-password"); // password ko exclude kr diya select se taki password wapas na jaye response me

    if (!user) {
        return res.status(400).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })

}



export async function resend(req, res) {
    const { email } = req.body;

    const user = await userModel.findOne({email});

    if (!user) {
        return res.status(400).json({
            message: "user not found",
            success: false,
            err: 'User not found'
        })
    }

    if (user.verified) {
        return res.status(400).json({
            message: "user already verified",
            success: false,
            err: 'User is verified already'
        })
    }


    const emailVerificationToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
    );

    await sendEmail({
        to: user.email,
        subject: "Welcome to Oi!",
        html: `
                <p>Hi ${user.username},</p>
                <p>Thank you for registering at <strong>Oi</strong>. We're excited to have you on board!</p>
                <p>To get started, please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Oi Team</p>
        `
    })

    res.status(201).json({
        message: "Email resent successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

