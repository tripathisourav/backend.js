const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)  // npm i dotenv taaki .env file se uri laa ske
    .then( () => {
        console.log('connect to Database'); 
    }) 
}


// connectToDB()


module.exports = connectToDB