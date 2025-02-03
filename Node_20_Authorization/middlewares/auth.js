const { getUser } = require("../service/auth");
// THIS IS FOR THE AUTHENTICATION
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;

  if (!tokenCookie)
    return next();

  //  validating authorization value
  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

// THIS IS FOR AUTHORIZATION
// closure
// yh function user ko restrict krta hai
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unAurhorized");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
