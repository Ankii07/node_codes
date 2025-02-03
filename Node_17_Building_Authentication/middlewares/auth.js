const {getUser} = require("../service/auth");  

async function restrictToLoggedInUsers(req, res, next) {
  const userUid = req.cookies?.uid;
  //agr userUid nhi hai toh login page pe redirect kro 
  if(!userUid) return res.redirect("/login");
  const user = getUser(userUid);
   // agr user nhi hai toh login page pe redirect kro
  if(!user) return res.redirect("/login"); 
  //   here we are setting the user in the request
  req.user = user;
  next();
}

async function checkAuth(req, res, next){
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUsers,
  checkAuth,
};