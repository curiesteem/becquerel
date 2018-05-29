var Steem =require('steem');
var express = require('express');
var router = express.Router();
var Post = require('../model/posts');
var Comment = require('../model/comment');
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


router.get('/toapprove', validateAuth(['reviewer']), function(req, res, next) {
    console.log("getting posts to approve");

    Post.find({ $and : [{'approved' : false}, {'rejected' : false} , {'closed' : false}]}, function(err, posts) {
        if (err) {
            res.send(err);
        }
        else  {
            //responds with a json object of our database comments.
           // console.log(posts);
            res.json(posts);
        }

    });
});

router.get('/approved/:page', function(req, res, next) {
    var thepage = req.params.page;
    console.log("getting approved posts on page " + thepage);

    Post.paginate({'approved' : true}, { page : thepage , limit:10, sort: {"reviewTime" : 'desc'}}, function(err, posts) {
    //Post.find({'approved' : true}, function(err, posts) {
        if (err) {
            res.send(err);
        }
        else  {
            //responds with a json object of our database comments.
            console.log(posts);
            res.json(posts.docs);
        }

    });
});

router.post('/approve/:id', function(req, res, next) {

    var id = req.params.id;
    var comment = req.body.comment;
    var user = req.body.user;
    console.log("Router to approve " + id);
    const doc = {
        approved: true,
        reviewTime : moment().utc(),
        reviewerComment : comment,
        reviewer : user
    }

    Post.update({_id: id}, doc, function(err, raw) {

        console.log("raw = " + raw);
        if (err) {
          res.send(err);
        }
        else {
           
            res.json({ response: 'Post was approved ' + id });
        }
      });
  
});

router.post('/reject/:id', function(req, res, next) {

    var id = req.params.id;
    var comment = req.body.comment;
    var user = req.body.user;
    console.log("Router to reject " + id);
    const doc = {
        rejected: true,
        reviewTime : moment().utc(),
        reviewerComment : comment,
        reviewer : user
    }

    Post.update({_id: id}, doc, function(err, raw) {

        console.log("raw = " + raw);
        if (err) {
          res.send(err);
        }
        else {
           
            res.json({ response: 'Post was rejected ' + id });
        }
      });
  
});

router.post('/comment/:id', function(req, res, next) {

    var id = req.params.id;
    var c = req.body.comment;
    var user = req.body.user;
    console.log("Router to comment " + id);

    const comment = { "$push" :    
        { "commentHistory" : {
        commenter : user,
        comment : c,
        timestamp : moment.utc(),
       
        }}
       
    }

    Post.update({_id: id}, comment, function(err, raw) {

        console.log("raw = " + raw);
        if (err) {
          res.send(err);
        }
        else {
           
            res.json({ response: 'Post was commented ' + id });
        }
      });
  
    
    // var c = new Comment();
    // c.post_id = id;
    // c.commenter = user;
    // c.comment = comment;
    // c.timestamp = moment().utc();


    // c.save(function(err, raw) {

    //     if (err) {
    //         console.log(err);
    //       res.send(err);
    //     }
    //     else {
    //         console.log("raw = " + raw);
        
    //         res.json({ response: 'Added Comment ' + id });
    //     }
    //   });
  
});

router.post('/close/:id', function(req, res, next) {

    var id = req.params.id;
    var comment = req.body.comment;
    var user = req.body.user;
    console.log("Router to close " + id);
    const doc = {
        closed: true,
        reviewTime : moment().utc(),
        reviewerComment : comment,
        reviewer : user
    }

    Post.update({_id: id}, doc, function(err, raw) {

        console.log("raw = " + raw);
        if (err) {
          res.send(err);
        }
        else {
           
            res.json({ response: 'Post was closed ' + id });
        }
      });
  
});

router.post('/' , validateAuth(['curator']), function(req, res, next) {

    console.log("in post" + JSON.stringify(req.body.submittedValues));
    var post = new Post();
    //body parser lets us use the req.body
    post.url = req.body.submittedValues.url;
    post.comments = req.body.submittedValues.comments;
    post.curator = req.body.submittedValues.curator;
    post.submittedtime = moment().utc();
    console.log("curator = " + post.curator + "has submitted post " + JSON.stringify(post));

   
    var url = post.url + ".json";
    //console.log(url);
    var options = {
        method: 'GET',
        uri: url,
        gzip: true,
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
    .then(async function (data) {
      // console.log(data);

            var resp = await businessLogic.checkSubmission(req.body.submittedValues, data);
            console.log("response from business logic = " + resp);

            if (resp.response === "success") 
            {
                
                post.posttitle = data.post.title;
                post.postuser = data.post.author;
                post.posttime = data.post.created;
                post.body = data.post.body;
                post.save(function(err) {
                    if (err) {
                        console.log("ERROR " + JSON.stringify(err));
                        if (err.message.includes("Error, expected `url` to be unique") ) {

                            console.log(err.message);
                            res.send({ err: 'Post has already been submitted' });
                        }
                    }
                    else {
                        res.json({ response: 'Post was succesfully submitted for approval' });
                    }
                });
            }
            else {
                console.log("unsuccesful submission " + JSON.stringify(resp));
                // send error respons
                res.json(resp);
            }
    })
    .catch(function (err) {
        console.log("error "+ err);
        if (err.message.toString().includes("Invalid URI"));
        {
        
            res.json({ err : "Invalid URL Submitted" });
        }
        
    });
            


    

    // do the user sanity checks. we probably need a user token and the username to stop spoofing but for now
    // just check the username and their permissions
    
});
    
       
      
        
   


module.exports = router;