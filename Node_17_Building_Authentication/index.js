const express = require("express");

// path is a core module in node.js which is used to work with file and directory paths
const path = require("path");

// here we are importing the cookie-parser module which is used to parse the cookies in the request headers
const cookieParser = require("cookie-parser");

// here we are importing the router from routes/url.js
const urlRoute = require("./routes/url");

const {restrictToLoggedInUsers , checkAuth} = require("./middlewares/auth");

const URL = require("./models/url");
// here we are importing the connectToMongoDB function from connection/connect.js
const { connectToMongoDB } = require("./connection/connect");
// here we are importing the router from routes/staticRouter.js
const staticRoute = require("./routes/staticRouter");
// here we are importing the router from routes/user.js to handle the user routes
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

const mongoURL = "mongodb://127.0.0.1:27017/short-url";

connectToMongoDB(mongoURL).then(() => {
  console.log("mongoDB connected");
});
// here we are setting the view engine to ejs using app.set which is a method to set the value of a key in the express application settings
// basically hum yha express ko bata rha hai ki hum ejs ka use karenge
// jiski path hai views folder
app.set("view engine", "ejs");
// ejs files are basically html files with embedded javascript
app.set("views", path.resolve("./views"));
// here we are using express.json() to parse the incoming request with JSON payloads

app.use(express.json());
// here we are using express.urlencoded() to parse the incoming request with urlencoded payloads from the form.
app.use(express.urlencoded({ extended: false }));
// to use the cookie-parser middleware we have to use app.use(cookieParser()) to parse the cookies in the request headers
app.use(cookieParser());

// here we are rendering the html page with the form to submit the URL
app.get("/test", async (req, res) => {
  // return res.end("<h1>Hey from server</>");

  const allUrls = await URL.find({});

  // return res.end(
  // // `
  // //   <html>
  // //    <head></head>
  // //    <body>
  // //    <ol>
  // //      ${allUrls.map((url) => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join("")}
  // //    </ol>
  // //    </body>
  // //   </html>`

  // )

  // ab humne jb ejs files bna hi liya hai to yha pe hum ejs file render karenge aur html code ko usme likh denge aur yha likhne ki jarurat nhi padegi
  // jisse code clean rahega aur readable bhi rahega aur maintainable bhi rahega aur ejs file me jo bhi changes karenge vo yha pe reflect ho jayenge.

  // here we can pass variable also
  return res.render("home", {
    urls: allUrls,
    name: "piyush",
  });
});

//jitne bhi frontend pages hote hai usko hum static files bolte hai

// age koi route /url se start hota hai toh urlRoute wale route me jayega
// yeh restrictToLoggedInUsers middleware function hai jo check krega ki user login hai ya nhi aur yh tabhi aage badhega jab user login hoga
app.use("/url",restrictToLoggedInUsers, urlRoute);
// here we are serving the static files from the public folder
// app.use is used to use the middleware function

// yha pe check kro authenticated hai ya nhi..
app.use("/",checkAuth, staticRoute);

// agr koi route /user se start hota hai toh userRoute wale route ko use krenge
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
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
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
