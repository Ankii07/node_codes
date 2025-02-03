//importing Router method from the express..
const { Router } = require("express");

const User = require("../models/user");

// making the instance of the router..
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // calling the function which was defined on the userSchema..
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
  // getting all these values from the request body using the destructuring method..
  const { fullName, email, password } = req.body;
  // creating the new user in model database..
  await User.create({
    fullName,
    email,
    password,
  });

  // after creating we directing back to homepage..
  return res.redirect("/");
});

module.exports = router;
