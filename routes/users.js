var express = require('express');
var router = express.Router();
var User = require('../model/user');
var rp = require('request-promise-native');
var moment = require('moment');
var util = require('../modules/util');



var err = function(error, resp) {
    resp.json(JSON.stringify(error));
}

var validateAuth = function(perm)
{
    return function(req,res,next)
    {
        console.log(JSON.parse(req.token));

        // return next();
 
         var ret = util.isAuthenticated(req, res, next, perm);
        
    }
}


router.get('/allusers', validateAuth('administrator'), function(req, res, next) {
    console.log("getting all users");
   

    User.find({}, function(err, users) {
        console.log("found");

        if (err) {
            console.log(err);
            res.send(err);
        }
        else  {
            //responds with a json object of our database comments.
            console.log(users);
            res.json(users);
        }

    });
});




module.exports = router;