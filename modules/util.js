var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.urlString = () => {
    let string = ''
    let allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++){
      string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return string;
}

module.exports.isAuthenticated = (req, res, next, permission) => {
  console.log("isAuthenticated :" + permission);
  
  var jsontoken =JSON.parse(req.token);
  console.log("token = " + jsontoken.token);
  console.log("sc " + config.jwtsecret)
  // validate the token.user against the session user and then validate that the req.token.token is hashed correctly

  /// test invalid jsontoken
 // jsontoken.token = jsontoken.token + "as";

  jwt.verify(jsontoken.token, config.jwtsecret, function(err, token)
  {
      if (err)
      {
          console.log(err);
          return res.status(401).send({ err: 'Failed to authenticate token.' });
      }
      else 
      {
          // check curator perms
          console.log("verified = " + JSON.stringify(token));
          if (permission === "curator")
          {
              if (token.curator === true) {
                console.log("valid curator");
                return next();
          }
              else 
              return res.status(401).send({ err: 'Failed to authenticate token.' });
          }
          else if (permission === "reviewer")
          {
            if (token.reviewer  === true)
           return next()
          else 
          return res.status(401).send({ err: 'Failed to authenticate token.' });;

          }
         // if(token.curator === true){
             
         // }
      }
  });
}
