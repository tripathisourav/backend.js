// for(let i = 1; i<= 4; i++){
//     console.log('hello')
// }

// node server.js se code terminal mein run ho jayega


// package.json tells about the dependencies on which js code depends
// node modules stores the code of packages we install  

// const catMe = require("cat-me")

// console.log(catMe());


// server ek machine hai jiske pass khud ka operating system khud ki ram khud khud ki storage hoti hai

const express = require("express")

const app = express() // server create ho jayegi iss line se 

app.listen(3000, () => {
    console.log('server is unning at port 3000');
}) // server ko start krta hai

// stop the server ctrl + c