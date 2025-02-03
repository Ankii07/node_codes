require("dotenv").config();
const path = require("path");
const express = require("express");
// requiring mongoose to handle mongo- database
const mongoose = require("mongoose");

const cookiePaser = require("cookie-parser");

// registring the routes that we created..
const userRoute = require("./routes/user");

const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const Blog = require("./models/blog");

// deloyment ke time make sure ki package.json mai main file app.js hi hona chahiye..kyuki yh file run hogi..
// aur script tag mat start hona hi chahiye jo ki server start krega automatically..

const app = express();
//localhost mai hum directly port number to de paa rhe hai..
// pr jb hum deploy krte hai to hume port number nhi pta hota ki konsa port number available hai..
// to uske liye hum process.env.PORT ka use krte hai..jo hume port number dega..jo available hai..
// const PORT = 8000;

const PORT = process.env.PORT || 8000;

// dev dependiemcies wh dependency hote hai jinki jurrort sirf development environment hai
// yh sare codes production mai use nhi honge jisse ki humara project ka size small rhega..

// connecting the mongodb..
// kyuki deployment ke time konsa database url use hoga yh pta nhi hota..to uske liye humne .env file mai database url daal diya hai..aur usko yha se access kr rhe hai.
// yaa phir process.env ki value deploement ke time set hogi aws ke dwara using export command..

// .env file mai hum koi bhi variable daal skte hai..aur usko access krne ke liye process.env.VARIABLE_NAME ka use krte hai..
// iss env file ko hum git mai push nhi krte..kyuki yh sensitive information hoti hai..aur yh publically access nhi honi chahiye..
// isse yh fayda hota hai ki hume bar bar database url change krne ki jarurat nhi hoti..hum sirf .env file mai change krte hai..aur usko access krte hai..

// dotenv ek package hai jisse hum .env variables ko load kr skte hai..aur usko access kr skte hai..

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongodb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
// to use cookie parser
app.use(cookiePaser());
// using our own created middleware
app.use(checkForAuthenticationCookie("token"));

// ISKA MATLB YH HAI KI JITNE BHI FILES HAI PUBLIC FOLDER MAI UNHE STATSTICALLY SERVE KR DO ISSE HOGA YH KI JO BHI FILES HAI PUBLIC FOLDER MAI UNHE BROWSER SE DIRECTLY ACCESS KR SKTE HAI..BINA KOI ROUTE LAGAYE..
app.use(express.static(path.resolve("./public")));

// rendering the ejs file
app.get("/", async (req, res) => {
  // GETTING ALL THE BLOGS WHICH ARE PERSENT AND WE WILL RENDER IT ON THE HOME PAGE USING EJS FILE
  // WHENEVER WE HAVE TO PERFORM ANY OPERATION ON THE DATABASE WE HAVE TO USE  ASYNC AWAIT BECAUSE IT IS ASYNC OPERATION AND IT WILL TAKE TIME TO FETCH THE DATA..AND CAN'T BE DONE SYNCHRONOUSLY..
  const allblogs = await Blog.find({}).sort({ createdAt: -1 });
  //RENDERING THE HOMEPAGE HERE
  res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

//agr koi route /user se start hoti hai uske liye userRoute ka use kro..
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
