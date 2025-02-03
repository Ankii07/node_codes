const path = require("path");
const express = require("express");
// requiring mongoose to handle mongo- database
const mongoose = require("mongoose");

// registring the routes that we created..
const userRoute = require('./routes/user')


const app = express();
const PORT = 8000;

// dev dependiemcies wh dependency hote hai jinki jurrort sirf development environment hai
// yh sare codes production mai use nhi honge jisse ki humara project ka size small rhega..

// connecting the mongodb..
mongoose.connect('mongodb://localhost:27017/blogify').then(() => console.log('Mongodb Connected'));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

// rendering the ejs file
app.get("/", (req, res) =>{
    res.render("home");
});

//agr koi route /user se start hoti hai uske liye userRoute ka use kro.. 
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));