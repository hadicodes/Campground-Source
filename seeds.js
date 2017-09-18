const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "A nice campground with soft ground near the clouds."
    },
    {
        name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Dry barren desert surrounds this campground."
    },
    {
        name: "Prairie Fields",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "This campground is filled with prairie."
    }
]


function seedDB() {
    // Removes all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
        // Adds in a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log("You have an ERROR!!!");
                } else {
                    console.log("Added a campground");
                    // create a comment
                    Comment.create({
                        text: "This place is nice but it needs internet access.",
                        author: "Andy"
                    }, function (err, comment) {
                        if (err) {
                            console.log("You have an ERROR!!!");
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;