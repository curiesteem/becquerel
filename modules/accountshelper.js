var Post = require('../model/posts');
var moment = require('moment')
var Json2csvParser = require('json2csv').Parser;




// generate the basic report of AR/CS/CLOSURES/SUBMISSOINS
module.exports.generateReport = async(start, end) => {
    // convert these dates to moments to start with
    let s = moment(start).utc();
    let e = moment(end).utc();

    let csv = null;

    // need a query to get all posts 
    var posts = await Post.find({ "submittedtime": { $gte: s, $lt: e } })

    let results = [];

    if (!posts || posts.length == 0) {
        console.log("invalid parameter");
        return ("error");
    }
    console.log("Generating report based on " + posts.length + " posts between " + s.format() + " and " + e.format());

    // build an array of users with SARC stats
    for (var i = 0; i < posts.length; i++) {
        let post = posts[i];
        let curator = post.curator;
        //console.log("found post by curator " + curator);
        // find this curator in the array
        let found = false;
        for (var j = 0; j < results.length; j++) {
            if (results[j].curator === curator) {
                //console.log("curator " + curator + " already exists ");
                // update this curator with this post score.
                if (post.approved) {;
                    results[j].approved += 1;
                } else if (post.rejected) {

                    results[j].rejected += 1;
                } else if (post.closed) {

                    results[j].closed += 1;
                } else {

                    results[j].queued += 1;
                }
                results[j].submitted += 1;
                //console.log("result " + JSON.stringify(results[j]));
                found = true;
                break;
            }
        }
        if (!found) {
            // add the curator to the array with this stat
            let stat = { "curator": curator };
            stat.approved = 0;
            stat.closed = 0;
            stat.queued = 0;
            stat.rejected = 0
            stat.submitted = 0;
            console.log("creating new curator in report " + curator);

            if (post.approved) {

                stat.approved += 1;
            } else if (post.rejected) {

                stat.rejected += 1;
            } else if (post.closed) {

                stat.closed += 1;
            } else {
                d
                stat.queued += 1;
            }
            stat.submitted += 1;
            results.push(stat);
        }

    }

    // now calculate cs and ar
    for (var i = 0; i < results.length; i++) {
        let curator = results[i];
        let ar = (parseFloat(curator.approved) / (parseFloat(curator.approved) + parseFloat(curator.rejected))).toFixed(2);
        let cs = ((ar * ar) * parseFloat(curator.approved)).toFixed(2);
        curator.cs = cs;
        curator.ar = ar;
        console.log("report for curator " + JSON.stringify(curator))
    }

    // generate a csv with this info

    const fields = [{label: 'Curator', value :'curator'} , {label: 'CS' , value: 'cs'}, {label : 'AR', value: 'ar'},{label: 'Approved', value: 'approved'}
                                ,{label : 'Rejected', value : 'rejected'},{label: 'Closed', value: 'closed'},{label: 'Submitted' , value : 'submitted'}];
    const json2csvParser = new Json2csvParser({ fields });
    csv = json2csvParser.parse(results);

    console.log(csv);



    return csv;

}