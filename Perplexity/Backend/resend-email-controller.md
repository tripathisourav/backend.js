const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('token', token);
export async function resend(req, res){
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    if(!user){
        return res.status(400).json({
            message: "user not found",
            success: false,
            err: 'User not found'
        })
    }

    if(user.verified){
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
        subject: "Welcome to Perplexity!",
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



Isme problem kya hai?

Maan lo:

User register karta hai.
Email nahi aata.
User browser close kar deta hai.
Next day website kholta hai.

Agar cookie expire ho gayi ya clear ho gayi to:

const userId = req.user.userId;

nahi milega aur resend email kaam nahi karega.

Verification email resend karne ke liye ideally user ko authenticated hona zaruri nahi hona chahiye.



better approach 

export async function resend(req,res){

    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(404).json({
            success:false,
            message:'User not found'
        })
    }

    if(user.verified){
        return res.status(400).json({
            success:false,
            message:'User already verified'
        })
    }

    // send mail again
}


rate-limiting

