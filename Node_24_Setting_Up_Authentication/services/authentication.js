const  JWT = require("jsonwebtoken");
const { model } = require("mongoose");

const secret = "$uperMan@123";

// creating the token with these payloads and in which we are passing user object..
function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    // we can pass expire duration also
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    // jo bhi payload humne pass kiya hoga yha mil jayega..
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}