const http = require("http");
const fs = require("fs");
//yha pe phle search hota hai dependicies ke andr wha milgya to thik agr wha nhi mila to
// apne inbuilt packages mai phir wha pe bhi nhi mila to currents directories mai..
const url = require("url");
// for handling the url in a greater way npm provides a url package
// which gives all the information related to url..
// npm stands for node package manager which provides various packages provided by node

// to import express
const express = require("express");
// to use express and app basicaly is a handler function..
const app = express();

//get mtlb konse request ke upr ek handler lgana hai..
// uske baad yh bola kis path ke upr get request lgana chahte ho..
// uske badd yh bolega ek handler function do jiske pass request aur response pass kroge. 
// jo ki usi particular route ke liye work krega..
app.get('/', (req, res)=>{
    return res.send("Hello from Home Page");
});

// isme hume query parameters ki chinta krne ki jurrort nhi..
// isme her cheez built in..
// express humare code ko bhut simple krta hai aur bhut clean krta hai 
// aur humare route ko easily handle krta hai..
app.get('/about', (req, res)=>{
    return res.send("Hello from About Page"+ "hey" + req.query.name + "you are"+ req.query.age);
});

// for post method
// app.post("/")


// function myHandler(req, res){
//     if(req.url === '/favicon.ico') return res.end();
//     // console.log(req.headers);
//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
//     // append file ko hum synchronous nhi rkhenge kyuki agr synchronouse aur request thread se jada aa gyi
//     // aur agr sare thread busy ho to user ko wait krna pd jayega iske liye async nhi bnayenge..
//     // always try to work with non-blocking task

//     // mading the parsing value true so it will give an object with the required values..
//     const myUrl = url.parse(req.url,true);
//     console.log(myUrl);

//     fs.appendFile("log.txt", log, (err, data) =>{
//         switch(myUrl.pathname){
//             case '/':
//                 if(req.method === "GET") res.end("HomePage");
//                 // res.end("homePge");
//             break;
//             case '/about':
//                 // res.end("I am Ankit the great");
//                 const username = myUrl.query.myname;
//                 res.end(`Hi, ${username}`);
//             break;
//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end("Here are your results for"+ search);
//                 break;
//             case "/signup":
//                 if(req.method === "GET") res.end("This is a signup Form");
//                 else if(req.method === "POST"){
//                     // database query
//                     res.end("sucess");
//                 }
//                 break;
//             default:
//                 res.end("404 Not Found");
//             break;
//         }
//         // res.end("Hello From Server Again");
//     });
//     // console.log("New Ref Rec.");
//     // // for response from my server
//     // res.end("Hello From Server");
// }


// const myServer = http.createServer(myHandler)

// yha pe yh jo humare handlers the automatically handle ho jayenge..
const myServer = http.createServer(app)

// Express basically ek framework haii jo humare kam ko easy aur fast bnane ke liye create ki gyi hai as react
// jaise ki humne yha myHandler create kiya hai own our own waise express ka use krke create kr skte hai automatically..

myServer.listen(8000,()=> {console.log("server started")})

