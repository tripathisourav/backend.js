// -- create server
// -- server ko config krna


const express = require('express')

const app = express();

app.use(express.json()) // middleware

const notes = []  // variables data stored in ram


// POST /notes 

app.post('/notes', (req, res) => {
    console.log(req.body);

    notes.push(req.body)

    res.status(201).json({
        message: "Note created successfully"
    })
    
})

// GET /notes 

app.get('/notes', (req, res) => {
    res.status(200).json({
        notes:notes
    })
})


// DELETE /notes/:index

app.delete('/notes/:index', (req, res) => {
    const params = req.params.index;
    delete notes[params]

    // res.send(`note ${params} deleted successfully`)  // ye krenga toh status code 200 aayega naki 204


    res.status(204).json({  // 204 status code pe app data nhi show kr skte 
        message: "Note deleted successfully"
    })
})

// PATCH /notes/:index

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message: "note updated successfully"
    })
})


module.exports = app


// jb bhi server restart hota hai hme nyi ram milti hai or whi nyi ram mein khali notes aa jata hai isliye baar baar hmara data kho jata hai


// server restart hota hai or pure data ko kho deta hia iss problem ko solve krta hai database

