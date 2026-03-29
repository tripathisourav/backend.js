const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => {
        console.log('Error connecting to DB');
    })
}


module.exports = connectDB;