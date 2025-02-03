const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  // getting the token here that we have created
  const token = setUser(user);
  // setting the token value as cookie
  res.cookie("token", token);
  return res.redirect("/");
  
  // return res.json({token })
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
