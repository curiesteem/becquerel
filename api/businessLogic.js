var moment = require('moment');

/******************** */
// this checks
// - if the post has already been submitted
// - time of creation of post in relation to users time limit and current curie rules
// - if the user has any posting slots available based on their profile based on current curie rules
// 
exports.checkSubmission = function(submittedValues, postDetails)
{
    console.log("Checking submissoin");
    if (postDetails.post === 'No post found')
    {
        return   {"response" : "This URL does not exist, please double check your post URL and try again."};
    }
    console.log(postDetails.post.created);
    //2018-01-16T18:07:18
    var created = moment.utc(postDetails.post.created);
    var minsPerUser = getPostMinutesForUser(submittedValues.curatorName);
    
    if (moment.utc().diff(created,'minute') < minsPerUser)
    {
        
          return {"response" : "Post is less than the required " + minsPerUser + " minutes old."};
    }
    else if(hasUserReachedLimit())
    {
        return {"response" : "You have reached your posting limit, if you feel this is in error, please contact an administrator"};
    }
    else {

        return {"response" : "success"};
    }
}

getPostMinutesForUser = function(user)
{
    return 45;
}

hasUserReachedLimit = function(user)
{
    return false;
}