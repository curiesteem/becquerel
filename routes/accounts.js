var Steem =require('steem');
var express = require('express');
var router = express.Router();
var Post = require('../model/posts');
var businessLogic = require('../api/businessLogic')
var rp = require('request-promise-native');
var moment = require('moment');
var util = require('../modules/util');



Steem.api.setOptions({ url: 'https://api.steemit.com' });


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


router.post('/curator/:start/:end', validateAuth('accounter'), function(req, res, next) {
    var start = Number(req.params.start);
    var end = Number(req.params.end);
    console.log("getting curator report between " + moment(start).utc().format() + " and " + moment(end).utc().format());

    

    
});




module.exports = router;