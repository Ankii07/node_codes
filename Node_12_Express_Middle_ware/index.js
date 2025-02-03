const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

// building the app here
const app = express();
const PORT = 8000;

//Middleware - Plugin

// Middleware_1

// yh middleware yh kr rha hai ki jo bhi form data client se aa rha hai usko parse krke 
// req.body mai daal de rha hai aur aage hum is data ko use kr paa rhe hai..
app.use(express.urlencoded({extended: false}));

// to parse the json file
app.use(express.json({extended:false}));

// Middleware functions are functions that have acess to the request object, the response object, and the
// middleware function in the application's request-response cycle. The next middleware function is commonly 
// denoted by a variable named next.

// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// call the next middleware function in the stack.

// Middleware_2

app.use((req, res, next) =>{
  console.log("Hello from middleware 1");
  // agr return kr dia to request yhi se lot jayega aur aage ki khuch bhi functions
  // parse nhi honge...
  // making changes to incoming request.. 
  req.myUserName = "piyushgard.dev";
  // return res.json({msg:'Hello from middleware 1' });
   //agr middleware ke aage wale functions ya middleware ko run krwana hai to yha hume next function ko pass 
  //  krwana hoga..
  next();
})

// Middleware 3
app.use((req, res, next) =>{
  // console.log("Hello from middleware 2");
  // now using the modified request in the next middleware..
  console.log("Hello from middleware 2", req.myUserName);
  // db query
  // credit card info
  // return res.end("Hey, Buddy how are you.")
  fs.appendFile('log.txt',`\n${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) =>{
      next();
    }
  )
  next();
})


// Routes
app.get("/api/users", (req, res) =>{
    return res.json(users);
});

app.get('/users', (req, res) =>{
    const html = `<ul>${users.map((user) => `<li>${user.first_name} </li>`).join("")} </ul>`;
    res.send(html);
})


app
  .route("/api/users/:id")
  .get((req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) =>{
    //Edit user with id
    const body = req.body;
    console.log("Body", body);
    console.log("First_name "+ body.first_name);
    users.push({...body, id:users.length +1});
    return res.json({status: "Pending"});
  })
  .delete((req, res) =>{
    //Delete user with id
    return res.json({status: "Pending"});
  });

// jo bhi data client ki traf se aata hai wh body mai aata hai..
// aur use req.body krke acess kr skte hai pr uske liye phle hume express middleware set krna hoga..

// pushing the data in the mock data..

app.post("/api/users", (req, res) =>{
    //TOOD : Create new user
    const body = req.body;
    console.log("Body", body);
    // pushing the data recieved from the client side to the users array
    users.push({...body, id:users.length +1});
    // writing the updated data to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{})
    return res.json({status: "sucess", id: users.length});
});


app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
