// -- server create krna 
// -- server config krna 



const express = require('express')

const app = express()  // server create ho jaata hai

app.use(express.json()) // middlware 

const notes = []

app.get('/', (req, res) => {
    res.send('hello user')
})


app.get('/notes', (req, res) => {
    res.send(notes)
})


app.post('/notes', (req, res) => {
    console.log(req.body);

    notes.push(req.body)

    res.send('notes created')
})


// agar mein koi ulta seedha index bhejumga jo index array mein exist bhi na krta ho wha pe bhi koi dikkat nhi aayegi kyoki wha pe kuch hai hi nhi
app.delete('/notes/:index', (req, res) => {
    const params = req.params.index

    delete notes[params]

    res.send(`node ${params} deleted successfully`)
})



app.patch('/notes/:index', (req, res) => {
    const params = req.params.index

    notes[params].description = req.body.description;

    console.log('note updated successfully');
    
    res.send(notes[params])
})
   
module.exports = app