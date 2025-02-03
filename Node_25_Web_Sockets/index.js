const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");

const app = express();
// kyuki hume yha ek websocket server chahiye to humne direct ek port ko listen nhi krwa skte..
// hume ek server create krna hoga
// so here we are creating a server
const server = http.createServer(app);
// here we are creating an instance websocket server
const io = new Server(server);

// socket.io 
// socket basically ek connection hoti hai client aur server ke beech me jo real time data exchange krne me help krti hai
io.on("connection",(socket) =>{
    //jb bhi koi frontend se user-message krke event aata hai usko console krwa lenge
    socket.on("user-message", (message) =>{
        console.log("A new User Message", message);
    })
});


app.use(express.static(path.resolve("./public")));
app.use(express.static("/public"));

app.get("/", (req, res) => {  
    return res.sendFile("./public/index.html");
});

server.listen(9000 , () => console.log("Server is running on port 9000"));