// http methods 
// get 
// post
// put 
// patch
// delete

// http get
// when you want to get some data from the server we use get
// when we search in the browser it always make the get request by default
// jb bhi server ko get response milta hai, server sirf read krta hai from the database 
// aur jo bhi result aata hai wh send kr deta hai client ko.

// http post
// when you want to send and mutate some data in server
// generally used to send data using form..

// http put 
// put generally use hota hai to put some data on the server
// gerally use to in uploading things..

// http patch
// http patch hum jb use krte hai jb hume existing value ko change krna hota hai..

// http delete
// http delete hum jb use krte hai jb hume khuch delete krna hota hai khuch from the server..

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
                if(req.method === "GET") res.end("HomePage");
                // res.end("homePge");
            break;
            case '/about':
                // res.end("I am Ankit the great");
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
            break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for"+ search);
                break;
            case "/signup":
                if(req.method === "GET") res.end("This is a signup Form");
                else if(req.method === "POST"){
                    // database query
                    res.end("sucess");
                }
                break;
            default:
                res.end("404 Not Found");
            break;
        }
        // res.end("Hello From Server Again");
    });
    // console.log("New Ref Rec.");
    // // for response from my server
    // res.end("Hello From Server");
})

// ek basic functionality server ka yh hota hai ki client se url lena 
// aur url ko parse krna aur parse krke jo result aaye usko search krna database mai
// database se jo result aaye usko client ko dena..

myServer.listen(8000,()=> {console.log("server started")})

