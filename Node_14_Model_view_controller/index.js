const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

// to extend the maintability of the code, we can create a separate file for the model and routes

// userRouter is a router object which
const userRouter = require("./routes/user");

// here we are importing the connectMongoDb function from connection.js
const {connectMongoDb} = require("./connection");

// here we are importing the logReqRes function from middlewares.js
// here we need not to give index.js as it is the default file and it get automatically imported
const {logReqRes} = require("./middlewares");

const mongoose = require("mongoose")

const app = express();
const PORT = 8000;

// connection to mongodb
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=> console.log("MongoDB Connected"));

// mongoose
// .connect("mongodb://127.0.0.1:27017/youtube-app-1")
// .then(()=> console.log("MongoDB Connected"))
// .catch((err)=> console.log("Mongo Error", err));




// middleware plugin

// here we are using the middleware to parse the request body
// express.urlendcoded() is a middleware function that parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: false}));

// app.use(express.json({extended:false}));


// app.use((req, res, next) =>{
//   console.log("Hello from middleware 1");
 
//   req.myUserName = "piyushgard.dev";
 
//   next();
// })

// app.use((req, res, next) =>{
 
//   console.log("Hello from middleware 2", req.myUserName);

//   fs.appendFile('log.txt',`\n${Date.now()}: ${req.method}: ${req.path}\n`,
//     (err, data) =>{
//       next();
//     }
//   )
//   next();
// })

app.use(logReqRes("log.txt"));

// Routes
// /user pe koi bhi request aayegi to userRouter wale routes pe jaana chahiye
app.use("/api/users", userRouter); 

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
