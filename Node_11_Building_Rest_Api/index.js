const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

// building the app here
const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));

// Routes
app.get("/api/users", (req, res) =>{
    return res.json(users);
});

app.get('/users', (req, res) =>{
    const html = `<ul>${users.map((user) => `<li>${user.first_name} </li>`).join("")} </ul>`;
    res.send(html);
})

// :id states that it is dynamic i.e it can be anything..
// app.get("/api/users/:id", (req, res) =>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

// aap dekh skte ho teeno routes same hi hai to aap merge kr skte ho..
// grouping

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
// app.patch("/api/users/:id", (req, res) =>{
//     //TOOD: Edit the user with id
//     return res.json({status: "pending"});
// });

// app.delete("/api/users/:id", (req, res) =>{
//     //TOOD: Delete the user with id
//     return res.json({status: "pending"});
// });

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
