// server ko create krna 


const express = require('express')
const noteModel = require('./models/notes.model')
const cors = require('cors')
const path = require('path')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('./public')) // public folder ke andar jitni bhi files hai unhe available bna dega





// - POST/api/notes
// - create new note and save data in mongodb
// - req.body = {title, description}



// why we just write /api/notes in link of api instead of writting the complete link http://localhost:3000/api/notes
// Because in Express backend, this route is already running on your server


app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({ title, description })  // note cluster mein create krne ke liye kuch time lagega isliye await likhenga

    res.status(201).json({
        message: "note created successfully",
        note
    })
})




// - GET /api/notes
// - Fetch all the notes data from mongodb send them to response


app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find() // array of objects

    res.status(200).json({
        message:'Notes fetched successfully',
        notes
    })
})




// - Delete /api/notes/:id
// - Delete note with the id from req.params

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    // console.log(id);

    await noteModel.findByIdAndDelete(id);
    
    res.status(200).json({
        message: "Note deleted successfully"
    })
})




// - Patch /api/notes/:id
// - update the description of the note by id


app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body
    
    await noteModel.findByIdAndUpdate(id, {description});

    res.status(200).json({
        message: 'note updated successfully'
    })
})



app.use('*name', (req, res) => {
    // res.send('this is wild card')  // will handle those api's which aren't created

    res.sendFile(path.join(__dirname,'..', "/public/index.html"))
    // res.sendFile('C:\Users\SOURABH\OneDrive\Desktop\backend.js\day9\Backend\public\index.html')  // not working
})

// console.log('this is dirname -> ',__dirname)
// __dirname jis bhi file ke andar use krte hai us folder ka path deta hai jismein file rehti hai

// ab localhost:3000 pe mujhe html ki file mil jayegi or phir woh html ki file css and js ki file ko request lagayengi


module.exports = app