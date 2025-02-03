const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

// to require mongoose package..
const mongoose = require("mongoose")

// building the app here
const app = express();
const PORT = 8000;

// to connect the moongo db to the node make sure your mongodb service is running..
// to start the service type command mongosh in the command prompt..

// to connect the mongodb we need install mongoose
// for connection
mongoose
.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error", err));

// to create new Schema 
// dependency mai timestamp true krne se yh hoga ki jab bhi koi data insert hoga to uska time and date bhi save ho jayega..
// jisse hame pata chalega ki kab data insert hua tha..
const userSchema = new mongoose.Schema({
    firstName:{
      //which type of data is needed to be filled.. 
      type: String,
      // required true means it need to filled if it is blank it will give error.
      required: true,
    },
    lastName:{
      type: String,
    },
    email:{
      type: String,
      required: true,
      // unique true means all the data in this column should be unique..
      unique: true,
    },
    jobTitle:{
      type: String,
    },
    gender:{
      type: String,
    }
 
},{timestamps: true});

// to create model
const User = mongoose.model("user", userSchema);


app.use(express.urlencoded({extended: false}));

app.use(express.json({extended:false}));


app.use((req, res, next) =>{
  console.log("Hello from middleware 1");
 
  req.myUserName = "piyushgard.dev";
 
  next();
})

app.use((req, res, next) =>{
 
  console.log("Hello from middleware 2", req.myUserName);

  fs.appendFile('log.txt',`\n${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) =>{
      next();
    }
  )
  next();
})


// Routes
app.get("/api/users", async(req, res) =>{
  const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.get('/users', async(req, res) =>{
  //getting the data from the mongodb database
  // empty object means all the data from the database
  // you need to use await keyword to get the data from the database
  const allDbUsers = await User.find({});
  console.log("All Users", allDbUsers);
    const html = `<ul>${allDbUsers.map((user) => `<li>${user.firstName} - ${user.emai}</li>`).join("")} </ul>`;
    res.send(html);
})


app
  .route("/api/users/:id")
  .get(async(req, res) =>{
    const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    // User.findById(id) means find the user with the id in the database
    const user= await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg: "User not found"});
    return res.json(user);
  })
  .patch(async(req, res) =>{
    //Edit user with id
    // const body = req.body;
    // console.log("Body", body);
    // console.log("First_name "+ body.first_name);
    // users.push({...body, id:users.length +1});

    // User.findByIdAndUpdate(id, {firstName: "changed"}) means update the user with the id in the database
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    return res.json({status: "Sucess"});
  })
  .delete(async(req, res) =>{
    // User.findByIdAndDelete(id) means delete the user with the id in the database
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Sucess"});
  });


app.post("/api/users",async(req, res) =>{
    
    const body = req.body;
    // console.log("Body", body);
    if(
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ){
      return res.status(400).json({msg: "All fields are req..."});
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    
    console.log("result", result);

    return res.status(201).json({msg: "Sucess"});

    // users.push({...body, id:users.length +1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{})
    // return res.json({status: "sucess", id: users.length});
});


app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
