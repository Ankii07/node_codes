// url stands for uniform resource locator

// https vs http 
// protocol setup rules hota hai jo hume batata hai ki 
// kaise browser se contact krna hai..

// https mai jitni bhi request aur response hogi wh sari encrypted hogi.
// isme ssl certificate  use hota hai..

// http mai ssl certificate nhi hota aur wh less secure hoti hai

// ek ws (websocket protocol) hota hai jo real time interaction ke liye use hota hai.

// domain.. user friendly name hota hai humare server ka..
// url = protocol + domain+ path
// there can be nested path as well..
// after path there can be additional quries parameters

const http = require("http");
const fs = require("fs");
//yha pe phle search hota hai dependicies ke andr wha milgya to thik agr wha nhi mila to
// apne inbuilt packages mai phir wha pe bhi nhi mila to currents directories mai..
const url = require("url");
// for handling the url in a greater way npm provides a url package
// which gives all the information related to url..

// npm stands for node package manager which provides various packages provided by node

const myServer = http.createServer((req, res) =>{
    if(req.url === '/favicon.ico') return res.end();
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
    // append file ko hum synchronous nhi rkhenge kyuki agr synchronouse aur request thread se jada aa gyi
    // aur agr sare thread busy ho to user ko wait krna pd jayega iske liye async nhi bnayenge..
    // always try to work with non-blocking task

    // mading the parsing value true so it will give an object with the required values..
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) =>{
        switch(myUrl.pathname){
            case '/':
                res.end("homePge");
            break;
            case '/about':
                // res.end("I am Ankit the great");
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
            break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for"+ search);
            default:
                res.end("404 Not Found");
            break;
        }
        // res.end("Hello From Server Again");
    });
    // console.log("New Ref Rec.");
    // for response from my server
    // res.end("Hello From Server");
})

// ek basic functionality server ka yh hota hai ki client se url lena 
// aur url ko parse krna aur parse krke jo result aaye usko search krna database mai
// database se jo result aaye usko client ko dena..

myServer.listen(8000,()=> {console.log("server started")})