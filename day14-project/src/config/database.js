const mongoose = require('mongoose')

async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI);

    console.log('connectod to DB');
    
}

module.exports = connectToDB