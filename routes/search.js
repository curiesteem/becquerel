var Steem =require('steem');
var express = require('express');
var router = express.Router();

Steem.api.setOptions({ url: 'https://api.steemit.com' });


var err = function(error, resp) {
    resp.json(JSON.stringify(error));
}


module.exports = router;