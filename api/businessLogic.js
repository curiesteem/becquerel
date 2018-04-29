var moment = require('moment');
var User = require("../model/user");
var CuratorLevels = require("../model/curatorlevels");

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
        return   {"response" : "This URL does not exist, please double check your post URL and try again."};
    }
    console.log(postDetails.post.created);
    //2018-01-16T18:07:18
    var created = moment.utc(postDetails.post.created);
    console.log("calling getpostminutesforuser for " + submittedValues.curator);

    var user = await User.findOne({"user" : submittedValues.curator });
    console.log("getting post minutes for user " + JSON.stringify(user));
    var limits = await CuratorLevels.findOne({"level" : user.level});
    var minsPerUser = limits.minutes;
    
    if (moment.utc().diff(created,'minute') < minsPerUser)
    {
            console.log("post is less that required " + minsPerUser);
            return {"err" : "Post is less than the required " + minsPerUser + " minutes old."};
    }
    else if(hasUserReachedLimit(user, limits))
    {
        return {"err" : "You have reached your posting limit, if you feel this is in error, please contact an administrator"};
    }
    else {

        return {"response" : "success"};
    }
}



hasUserReachedLimit = function(user, limits)
{
    return false;
}