const express = require('express');

const app = express();

app.use(express.json()) // server by default itna capable nhi hota ki req.body ke data ko padh ske isliye yeh middleware line likhi jaati hai


const notes = []

app.get('/', (req, res) => {
    res.send('Welcome to server ')
})


app.post('/notes', (req, res) => {
    console.log(req.body);

    notes.push(req.body)
    
    res.send('notes created')
})

app.get('/notes', (req, res) => {
    res.send(notes)
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})