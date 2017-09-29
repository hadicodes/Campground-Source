var mongoose = require('mongoose');
// adds passport medthods to User model
var passportLocalMongoose =require("passport-local-mongoose");

// SCHEMA SETUP
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User", userSchema);

