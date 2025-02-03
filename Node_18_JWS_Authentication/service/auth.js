// no need to maintain state anymore
// const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
secret = "ankit@1234";

// here we are making tokens to be used
function setUser(user) {
  // const payload = {
  //   id,
  //   ...user,
  // };
  // return jwt.sign(payload, secret);

  return jwt.sign({ _id: user._id, email: user.email }, secret);
}

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

function getUser(token) {
  if (!token) return null;
  // verifying the recieved token with secret that we have create earlier
  try{
    return jwt.verify(token, secret);
  } catch(error){
     return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
