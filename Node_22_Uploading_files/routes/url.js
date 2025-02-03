const express = require("express");

// Here we are importing the handleGenerateNewShortURL function from controllers/url.js
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

// Here we are creating a new router
const router = express.Router();

// here we are posting the data to the URL collection using the handleGenerateNewShortURL function
router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics)

// exporting the router 
module.exports = router;