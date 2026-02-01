const mongoose = require('mongoose')


// format jismein data aayega
const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
})

const noteModel = mongoose.model("notes", noteSchema);  // same format ke notes ko store krne ke liye hmne collection "notes" bnaya hai

module.exports = noteModel