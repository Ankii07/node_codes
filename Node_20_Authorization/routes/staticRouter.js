const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// creating a route for admin acess only..
router.get("/admin/urls", restrictTo(["ADMIN"]), async(req, res) =>{
  const allurls = await URL.find({});
  return res.render("home",{
    urls: allurls,
  });
})

// GIVING ACESS TO BOTH ADMIN AND NORMAL USERS
router.get("/",restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
