import nodemailer from "nodemailer";


// ankurdotio -> diffrence-backend-video -> node-mailer



// transpoters are used to send emails, we can have multiple transporters for different email services or configurations. 
// Here we are using Gmail's SMTP service with OAuth2 authentication.
const transporter = nodemailer.createTransport({
    service: "gmail",
    // we are using OAuth2 authentication for sending emails, which is more secure than using plain username and password. 
    // The credentials for OAuth2 are stored in environment variables for security reasons.
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
    .then(() => { console.log("Email transporter is ready to send emails"); })
    .catch((err) => { console.error("Email transporter verification failed:", err); });




// transporter web server or smtp server ke sath connection banata hai aur email bhejne ke liye use hota hai. Humne transporter ko verify 
// kiya hai taaki ensure kar sake ki wo sahi tarah se configure hua hai aur emails bhejne ke liye ready hai. Agar verification successful 
// hota hai to console me message print hoga, otherwise error message print hoga.
export async function sendEmail({ to, subject, html, text }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}