const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return(req, res, next) =>{
        // getting the cookievalue from the request which was automatically embeded in the request by the browser..
        const tokenCookieValue = req.cookies[cookieName];
        // console.log(tokenCookieValue+" tokem")
        if(!tokenCookieValue){
           return next();
        }
        try{
            // getting the payloads back
            const userPayload = validateToken(tokenCookieValue);
            // setting user value in the requesturl object which will be used further
            req.user = userPayload;
            // console.log(JSON.stringify(req.user)+"req11")
            // console.log(JSON.stringify(req.user)+"req");
        }catch(error){}

          return next();
    };  
}  
    
module.exports ={
    checkForAuthenticationCookie,
  }