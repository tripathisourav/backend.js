const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    age:Number,
}) // schema ke andar hm hr cheez ko define karenga kon si honi chaiye agar nhi karenga toh bhale hi hm frontend se data bheje wo store nhi hogi agar age maine schem mein nhi rakhi toh woh database mein nhi jayegi


const noteModel = mongoose.model("notes", noteSchema);  // collection jo ek type ka data rakhta hai usi ka naam dete hai model mein "notes"


// model ke bina kuch bhi nhi hoga


module.exports = noteModel