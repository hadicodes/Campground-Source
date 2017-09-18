const mongoose = require("mongoose"),
    Campground = require("./models/campground");



function seedDB() {
    // Removes all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
    });
    // Adds in a few campgrounds
    Cam
}

module.exports = seedDB;