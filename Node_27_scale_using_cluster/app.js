const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) =>{
    // process.pid states id of thread which handles the recieved process.
    return res.json({message:`Hello from Express Server ${process.pid}`});

});

app.listen(PORT, ()=>console.log(`Server Started At PORT: ${PORT}`));