
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var UserSchema = new Schema({
   
    user: {type :String, index:true,unique : true },
    curator : {type : Boolean, default : false},
    reviewer : {type : Boolean, default : false},
    accounter : {type : Boolean, default : false},
    administrator : {type : Boolean, default : false},
    isTopCurator : {type: Boolean, default: false},
    enabled : {type: Boolean, default: true},
    maximumSubmissions : {type: Number},
     

});

UserSchema.plugin(uniqueValidator);

//export our module to use in server.js
module.exports = mongoose.model('User', UserSchema);
