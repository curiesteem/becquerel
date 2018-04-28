var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../model/user');

module.exports.urlString = () => {
    let string = ''
    let allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++) {
        string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return string;
}

module.exports.isAuthenticated = (req, res, next, permission) => {
    console.log("isAuthenticated :" + permission);

    var jsontoken = JSON.parse(req.token);
    console.log("token = " + jsontoken.token);
    console.log("sc " + config.jwtsecret)
        // validate the token.user against the session user and then validate that the req.token.token is hashed correctly

    /// test invalid jsontoken
    // jsontoken.token = jsontoken.token + "as";

    jwt.verify(jsontoken.token, config.jwtsecret, function(err, token) {
        if (err) {
            console.log(err);
            return res.status(401).send({ err: 'Failed to authenticate token.' });
        } else {
            // check curator perms
            if (permission === "curator") {
                if (token.curator === true) {
                    console.log("valid curator " + token.user);
                    // check the database to ensure that this user has still got permission
                    User.find({ 'user': token.user, 'curator': true }, function(err, obj) {
                        console.log(obj);
                        if (err)
                        {
                            console.log(err);
                        }
                        if (obj.length > 0) {
                            console.log("found the user in the database and has persmission")
                            return next();
                        } else {
                            console.log("unable to find user in database with curator permission")
                            return res.status(401).send({ err: 'Failed to authenticate token.' });
                        }
                    })

                } else 
                    return res.status(401).send({ err: 'Failed to authenticate token.' });
            } else if (permission === "reviewer") {
                if (token.reviewer === true) {
                    User.find({ 'user': token.user, 'reviewer': true }, function(err, obj) {
                        if (obj.length > 0) {
                            return next();
                        } else {
                            return res.status(401).send({ err: 'Failed to authenticate token.' });
                        }
                    })
                } else {
                    return res.status(401).send({ err: 'Failed to authenticate token.' });;
                }
            } else if (permission === "administrator") {
              if (token.administrator === true) {
                  User.find({ 'user': token.user, 'administrator': true }, function(err, obj) {
                      if (obj.length > 0) {
                          return next();
                      } else {
                          return res.status(401).send({ err: 'Failed to authenticate token.' });
                      }
                  })
              } else {
                  return res.status(401).send({ err: 'Failed to authenticate token.' });;
              }
            // if(token.curator === true){
            }
            // }
        }
    });
}