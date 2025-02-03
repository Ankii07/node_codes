const mongoose  = require('mongoose');

 
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    // here visitHistory is an array of objects, each object has a timestamp property
    visitHistory:[{timestamp: {type: Number}}],
    // created by mai hum yeh kr rhe hai ki yha pe ek id dunga jo ki 
    // is user ko refer kregi..
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
});

// here we are creating a model named URL, which will have the schema urlSchema using
const URL = mongoose.model('URL', urlSchema);

module.exports = URL;   // exporting the model URL