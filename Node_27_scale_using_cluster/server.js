// cluster ek built-in module hai..
const cluster = require("cluster");
const os = require("os");
const express = require("express");

// Clusters of Node.js process can be used to run multiple instances of
// Node.js that can be distribute workloads among their application threads.
// when process isolation is not needed, use the worker_threads module instead,
// which allows running multiple applicaton threads within a single Node.js instance.



// jitne humare pass cpus hai hum utne thread bna skte hai..
const totalCPUs = os.cpus().length;
// 8 core cluster
// console.log(totalCPUs);

if(cluster.isPrimary){
    //making the cluster workers
    for(let i =0; i< totalCPUs; i++){
        cluster.fork();
    }
}else{
    const app = express();
    const PORT = 8000;

    app.get("/",(req,res)=>{
        return res.json({
            message: `Hello from Express Server ${process.pid}`,
        });
    })

    app.listen(PORT, ()=> console.log(`Server Started At PORT:${PORT}`));
}