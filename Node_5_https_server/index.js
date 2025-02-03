// main file ka naam hum index.js rkhte hai yhi norm hai..
// ise pta chlta hai ki yh humara yh entry point hai

//ek api server bnane ke liye ek build in module hota hai jiska naam hota hai http  

// to close the server use ctrl+c 
const http = require("http");
const fs = require("fs");

// to create server http module provide .createServer in which we have to pass
// a call back function which contains two arguments first is for handling request from the client
// and second is for handling response from the server side..

// hum ek log file bna skte haii jo hume btayega request kon si aa rhi hai aur kon se path se aa rhi hai..



const myServer = http.createServer((req, res) =>{
    // 
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    // append file ko hum synchronous nhi rkhenge kyuki agr synchronouse aur request thread se jada aa gyi
    // aur agr sare thread busy ho to user ko wait krna pd jayega iske liye async nhi bnayenge..
    // always try to work with non-blocking task
    fs.appendFile("log.txt", log, (err, data) =>{
        switch(req.url){
            case '/':
                res.end("homePge");
            break;
            case '/about':
                res.end("I am Ankit the great");
            break;
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

// to run a server we need a port number
// port number are like node on which we have to run the server
// for this http provides .listen

// we cant run the multiple server on the same port number..
// isme mai hum ek call back bhi pass kr skte hai jo ki yeh btayega ki jb bhi sb khuch
// shi se run ho jaye to console krdo server started..
myServer.listen(8000,()=> {console.log("server started")})

// agr aap khuch bhi change krte ho server pe to directly server pe nhi dikhega aapko restart krna pdega server..