const express = require("express");
const fs = require("fs");
// to require express-status-monitor..
const status = require("express-status-monitor");

const zlib = require(`zlib`);



// there is a npm express-status monitor which show all the aspects of our server
// such as memory usage, cpu usage, e.t.c

const app = express();
const PORT = 8000;

app.use(status());

// to zip file using stream
// yha pe humare memory mai khuch nhi hoga..file saath hi read hui,,saath hi saath zip mai conver hui
// aur saath hi saath file mai writebhi ho gyi jisse ki humare memory intervention km se km hua aur memory consumption km se km hui..
fs.createReadStream('./sample.txt').pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
)

// yha pe data directly file se read krne pe ho yh rha hai ki phle file ka sara data , data variable mai aa jata hai..
// aur phir is data variable se browser pe jata hai jisse ki humare server ka memory consumption badh jata hai ..

// is memory consumption ko km krne ke liye aur data , variable mai na store hokr directly browser pe show ho
// by using small small chunks jisse ki memory consumption bhut km ho jayega aur server pe load km pdega iske liye hum
// use krte hai node js stream..

// stream ka mtlb yh hota hai ki data data jaise jaise aata rhta hai waise waise send krte jao..
// saare ko ek baar mai load krne ki jurrort nhi.. ise khte hai pipeling

app.get("/", (req, res) => {
  //    fs.readFile("./sample.txt", (err, data) =>{
  //     res.end(data);
  //    });

  //   hume file se read krna hai stream by stream
  const stream = fs.createReadStream("./sample.txt", "utf-8");

  // jb data aata jayega humare pass ek chunk aayega..
  // chunk mtlb us pure data ka chhota sa part..

  //jb bhi hum res.write krte hai ek header set hota hai jisse hum khte hai
  // transfer- encoding: chunked means data will be recieved in form of chunk

  stream.on("data", (chunk) => res.write(chunk));
  //jb bhi pura data file se aa jayega hum response ko end kr denge..
  stream.on("end", () => res.end());
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
