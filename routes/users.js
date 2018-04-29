var express = require('express');
var router = express.Router();
var User = require('../model/user');
var rp = require('request-promise-native');
var moment = require('moment');
var util = require('../modules/util');
var mongoose = require('mongoose');



var err = function(error, resp) {
    resp.json(JSON.stringify(error));
}

var validateAuth = function(perm) {
    return function(req, res, next) {
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
        } else {
            //responds with a json object of our database comments.
            console.log(users);
            res.json(users);
        }

    });
});

router.post('/update', validateAuth('administrator'), function(req, res, next) {
    console.log("in post")
    var user = req.body;
    console.log("Router to save user " + JSON.stringify(user));



    var id = user._id;
    if (user.newuser) {
        id = new mongoose.mongo.ObjectID();
        delete user.newuser;
    }
    delete user._id;

    User.update({ _id: id }, user, { upsert: true, setDefaultsOnInsert: true }, function(err) {
        if (err) {
            console.log(err);
            res.json({ err: 'Unable to save user :' + err.message });
        } else {
            res.json({ response: 'User ' + user.user + ' saved' });
        }

    });




});

router.post('/delete', function(req, res, next) {
    console.log("in post - " + req.body.user)
    var username = req.body.user;
    var id = req.body._id;
    console.log("Router to delete user " + username + " : " + id);
    User.findByIdAndRemove({ _id: new mongoose.mongo.ObjectID(id) }, function(err) {
        if (err) {
            console.log("ERROR " + JSON.stringify(err));

            console.log(err.message);
            res.send({ err: 'Unable to delete user :' + err.message });

        } else {
            console.log("username " + username + " deleted")
            res.json({ response: 'User ' + username + ' deleted' });
        }

    }


    )
});




module.exports = router;