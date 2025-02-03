// file ko handle krne ke liye hume ek package chahiye hota hai
// jiska naam hota hai fs jo ki stand krta hai for file system..

// fs module inbuilt hota hai 
const fs = require("fs");

// we are creating a synchronous test.txt file in the current directory 
// in which we are writing the content Hey There....
// fs.writeFileSync("./test.txt", "Hey There")

// it will override the content of the created file
// fs.writeFileSync("./test.txt", "Hello world")

// Async
// fs.writeFile("./test.txt", "Hello world Async", (err) =>{});

// to read the file
// const result = fs.readFileSync('./contact.txt', "utf-8")

// console.log(result);

// Async read it doesn't return text so we can't pass it to a variable as it in the case earlier
// fs.readFile("./contact.txt", "utf-8", (err, result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })

// we always have to pass the string 
// to append the text in already created file not to async..
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

// to copy one file to another..
fs.cpSync("./test.txt", "./copy.txt");

// to unlink or delete the file
fs.unlinkSync("./copy.txt");

// to see the status
console.log(fs.statSync("./test.txt"))

// to see file exists or not
console.log(fs.statSync("./test.txt").isFile())

// to make director
// fs.mkdirSync("my-docs/a/b", {recursive: true});
