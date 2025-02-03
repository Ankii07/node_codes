
const path = require("path");
const express = require("express");

//file upload krne ke liye ek package install krna hota hai jiska naam hota hai multer..
// for handling file uploads
const multer = require("multer");

// here we are saying whatever we are uploading via form store it in the upload folder..
// const upload = multer({dest:"uploads/"})

const app = express();
const PORT = 8000;

// 
const storage = multer.diskStorage({
  // handling the destination
  destination: function(req, file, cb){
    // cb(error, destination)
    return cb(null, "./uploads");
  },

  // giving the updated-name to the uploaded file
  // here Date.now is being added to the file name so that every time the filename will be unique
  // and no conflict or override will be there..
  filename: function(req, file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({storage: storage});   

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// to parse the form data..
app.use(express.urlencoded({extended: false}));

app.use(express.json());


app.get("/", (req, res) =>{
  return res.render("homepage");
})

//upload.single("profileImage") means we are uploading a single file named profileImage
// upload.single("profileImage"),

app.post("/upload",upload.fields([{name: "profileImage"}, {name: "coverImage"}]), (req,res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
})



app.listen(PORT, ()=> console.log(`Server Started at PORT:8000`));