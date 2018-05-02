var moment = require('moment');
var User = require("../model/user");
var CuratorLevels = require("../model/curatorlevels");
var Posts = require("../model/posts")

/******************** */
// this checks
// - if the post has already been submitted
// - time of creation of post in relation to users time limit and current curie rules
// - if the user has any posting slots available based on their profile based on current curie rules
// 
exports.checkSubmission = async function(submittedValues, postDetails)
{
    console.log("Checking submissoin");
    if (postDetails.post === 'No post found')
    {
        return   {"err" : "This URL does not exist, please double check your post URL and try again."};
    }
    console.log(postDetails.post.created);
    //2018-01-16T18:07:18
    let created = moment.utc(postDetails.post.created);
    // check to see if post is created in the last 24 hours
    let yesterday  = moment().utc().subtract(24, "hours");

    if (created.isBefore(yesterday))
    {
        return   {"err" : "Post is more than 24 hours old."};
    }

    console.log("calling getpostminutesforuser for " + submittedValues.curator);

    let user = await User.findOne({"user" : submittedValues.curator });
    console.log("getting post minutes for user " + JSON.stringify(user));
    let limits = await CuratorLevels.findOne({"level" : user.level});
    let minsPerUser = limits.minutes;
    
    if (moment.utc().diff(created,'minute') < minsPerUser)
    {
            console.log("post is less that required " + minsPerUser);
            return {"err" : "Post is less than the required " + minsPerUser + " minutes old."};
    }
    else if(await hasUserReachedLimit(user, limits))
    {
        return {"err" : "You have reached your posting limit of " + limits.limit + " in the last 7 days."};
    }
    else {

        return {"response" : "success"};
    }
}



hasUserReachedLimit = async (user, limits) =>
{
    // get posts for the user in the last 7 days
    let oneWeekAgo = moment().utc().subtract(7, "days");
    let posts = await Posts.find( { $and: [ {"curator" : user.user}, {"submittedtime" : {$gt: oneWeekAgo.utc().toDate()}} ]})
   // console.log(JSON.stringify(posts))
    if (posts.length >= limits.limit)
    {
        // trying to submit more than they should in the last 7 days
        return true;
    }

    return false;
}

