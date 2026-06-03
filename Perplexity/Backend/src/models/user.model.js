import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // Only hash the password if it has been modified (or is new)
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


/**
 * we can use the comparePassword method like this:
 * anywhere in our code where we have access to the user document, we can call the comparePassword method to check if the provided 
 * password matches the hashed password stored in the database. For example:
 * const user = await usermodel.findOne({ email: 'test@test.com' });
 * user.comparePassword('plaintextpassword')
 * .then(isMatch => {
 *   if (isMatch) { 
 *    // Passwords match, proceed with login
 *  } else {
 *   // Passwords do not match, return an error
 * }
 */



const userModel = mongoose.model('User', userSchema);

export default userModel;