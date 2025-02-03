const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    // here we are connecting to the MongoDB database using the connect method of mongoose
    return mongoose.connect(url);

}
    
module.exports = {
    connectToMongoDB,
}