// server ko start krna 
// database se connect krna

const app = require('./src/app')

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://sorv:Dy3NNNIVe9TwbbhW@cluster0.roaoapw.mongodb.net/day-6") // agar day-6 naam ka koi database nhi mila cluster mein toh ye khud dsy6 naam ka cluster bna degi
    .then(() => {
        console.log('Connected to Database');
    })
}

connectToDb()

app.listen(3000, () => {
    console.log('server is running on port 3000');
})