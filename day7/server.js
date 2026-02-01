// server ko start krna database se connect krna

// const mongoose = require('mongoose')

require('dotenv').config()

const connectToDB = require('./src/config/database')

connectToDB()

const app = require('./src/app')


app.listen(3000, () => {
    console.log('server is running on port 3000');  
})