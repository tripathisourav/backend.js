// server ko start krna 
// database se connect krna

// npm init -y to initiate server

require('dotenv').config()  // ab .env ke andar jo MONGO_URI hai use khi bhi access kr skte hai
const app = require('./src/app');
const connectToDb = require('./src/config/database');

connectToDb()

app.listen(3000, () => {
    console.log('server is running on port 3000');
})