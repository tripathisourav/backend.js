// create server


const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express();


// middleware
app.use(express.json())
app.use(cors())
app.use(express.static('./public')) // html css js ki files ab publically available hai ab jb localhose:3000 pe index.html file req kregi js and css files ki toh req fulfill ki jayegi

// ab localhost:3000 pe dono frontend or backend chalenga

const noteModel = require('./models/notemodel')



// creating api's


// post
app.post('/api/notes', async (req, res) => {
    const {title, description} = req.body

    const note = await noteModel.create({ title, description })

    res.status(201).json(
        {
            message:'note created successfully',
            note
        }
    )
})





// get


app.get('/api/notes', async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json(
        {
            message:'notes fetched successfully',
            notes
        }
    )
})





// delete


app.delete('/api/notes/:id', async (req, res) => {

    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json(
        {
            message:'note deleted successfully'
        }
    )
})





// patch


app.patch('/api/notes/:id', async (req, res) => {

    const id = req.params.id;

    const { title, description } = req.body; 
    await noteModel.findByIdAndUpdate(id, {title, description})

    res.status(200).json(
        {
            message:'note updated successfully'
        }
    )
})




app.use('*name', (req, res) => {
    // res.send('this is wild card')  // will handle those api's which aren't created

    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

// ab localhost:3000 pe mujhe html ki file mil jayegi or phir woh html ki file css and js ki file ko request lagayengi


module.exports = app;