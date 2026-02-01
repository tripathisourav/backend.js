// server ko create krna 


const express = require('express')
const noteModel = require('./models/notes.model')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())





// - POST/api/notes
// - create new note and save data in mongodb
// - req.body = {title, description}


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

module.exports = app