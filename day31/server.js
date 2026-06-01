import app from './src/app.js';

// socket io documentation
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


// server pr jb nya connection banega tb callback chalao 
io.on("connection", (socket) => {
    // console.log('A new connection created');

    //message event fired from any user(socket) will be listened
    // socket.on("message", (msg) => { 
    //     // message can be also be send in json format   
    //     console.log('user fired message event', msg);

    //     // Send to sender
    //     // socket.emit("reply", "Message received!");

    //     // Send to everyone EXCEPT sender
    //     // socket.broadcast.emit("newMessage", msg);

    //     // Send to everyone INCLUDING sender
    //     // io.emit("abc", msg);
    // });

    socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) }); 
});




// Connected to http://localhost:3000/
// Listening toabc
// messagehello
// abc[object Object]



httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});

