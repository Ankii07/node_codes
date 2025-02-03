const User = require("../models/user");
// here we are importing the uuidv4 function from the uuid package
// uuid package is used to generate unique ids
const { v4: uuidv4 } = require('uuid');


const {setUser} = require("../service/auth");

// This function is used to handle the user signup
async function handleUserSignup(req, res) {
    // here we are extracting the name, email and password from the request body
  const { name, email, password } = req.body;
    // here we are creating a new user in the user model database
  await User.create({ name, email, password });

  // return res.json({message: 'User created successfully'});
//  after creating the user we are rendering the user to the home page
  // return res.render("/");

  res.redirect("/")
}

async function handleUserLogin(req, res) {
  // here we are extracting the email and password from the request body
const { email, password } = req.body;
 
const user =await User.findOne({email, password});

// to use cookie we have to install cookie-parser package
if(!user){
  return res.render("login",{
    error: "Invalid Username or Password",
  });

  
}
// here we are generating a unique session id for the user
const sessionId = uuidv4();
// here we are setting the user in the session id
setUser(sessionId, user);
// here we are setting the session id in the cookie
// cookie is a small piece of data stored in the client's browser
// which is used to store the session id and mainly used for session management
res.cookie("uid", sessionId);
return res.redirect("/")
}

module.exports ={
  handleUserSignup,
  handleUserLogin,
} 