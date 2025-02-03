const mongoose = require('mongoose');



// here we are creating a schema for the user
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true, 
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
// here we are creating a model for the user
const User = mongoose.model('User', userSchema);

// here we are exporting the user model
module.exports = User;