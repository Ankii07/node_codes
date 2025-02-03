const {Schema, model} = require("mongoose");

const commentSchema = new Schema({
    content:{
        type: String,
        required: true,
    },
    // yh comment kis blog ke liye hai hum uski id bhi rakhenge..
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    // comment kisne kiya hai
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},{timestamps: true});

const Comment = model('comment', commentSchema);

module.exports = Comment;