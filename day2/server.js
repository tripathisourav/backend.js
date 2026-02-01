const express = require('express')
const app = express();  // server instance create krna 

app.get('/', (req, res) => {
    res.send('Hello world')
})


app.get('/about', (req, res) => {
    res.send('This is about page')
})

app.get('/home', (req, res) => {
    res.send('This is home page')
})


app.listen(3000,() => {
console.log('Server running on port 3000');
});  // server start krna

// npx nodemon server.js run krne se jaise hi js mein changes honge woh automatically update krti jayegi


// node modules and .env github pe nhi jaati unhe ignore krne ke liye hm git ignore file banate hai