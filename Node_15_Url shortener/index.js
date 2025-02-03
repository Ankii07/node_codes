const express = require("express");

// here we are importing the router from routes/url.js
const urlRoute = require("./routes/url");

const URL = require("./models/url");

const { connectToMongoDB } = require("./connection/connect");

const app = express();
const PORT = 8001;

const mongoURL = "mongodb://127.0.0.1:27017/short-url";

connectToMongoDB(mongoURL).then(() => {
  console.log("mongoDB connected");
});

// here we are using express.json() to parse the incoming request with JSON payloads
app.use(express.json());

// age koi route /url se start hota hai toh urlRoute wale route me jayega
app.use("/url", urlRoute);

app.get(
  '/:shortId',
  async (req, res) => {
    const shortId = req.params.shortId;
    
    // findoneandupdate is used to update the document in the URL collection it is a class method to find a document and update it

    // Here we are finding the document in the URL collection with the shortId and updating the visitHistory array with the current timestamp
    const entry = await URL.findOneAndUpdate(
        {
        shortId: shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
    }
    );
    // res.redirect is used to redirect the user to the redirectURL
   res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
