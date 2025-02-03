// nanoid is use to generate a unique id for the short URL
const shortid = require("shortid");
// here we are importing the URL model
const URL = require("../models/url");

// In this function handleGenerateNewShortURL, we are creating a new document in the URL collection
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortID = shortid(); // generating a short id of length 8
  // Here using URL.create() we are creating a new document in the URL collection
  await URL.create({ shortId: shortID, 
    redirectURL: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
 }); 
  //here we are sending the shortId in the response in the form of JSON
    // return res.status(201).json({ shortId: shortID });
    return res.render("home", {
      id: shortID,
    });
}

// async handleGetAnalytics(req, res) should be declared as a function. In JavaScript, you cannot declare a function with the async keyword and a name directly like that. 
// It should be declared as const handleGetAnalytics = async (req, res) => { ... }.
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });  // finding the document in the URL collection with the shortId
    
    return res.json({
      totalClicks: result.visitHistory.length, // sending the total number of clicks
      Analytics: result.visitHistory, // sending the visitHistory array
    });
  }


// exporting the function handleGenerateNewShortURL
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};