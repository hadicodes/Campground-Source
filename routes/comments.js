const express = require("express"),
router        = express.Router(),
Campground    = require("../models/campground"),
Comment       = require("../models/comment");

//======================================================
// COMMENTS ROUTES
//======================================================

// Show New Comments Form Route
router.get("/new", isLoggedIn, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("You have an ERROR!!!");
        } else {
            res.render('comments/new', {
                campground: campground
            });
        }
    });
});


// POST Comments Route 
router.post('/', isLoggedIn, function (req, res) {
    // Lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("You have an ERROR!!!");
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            // create comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log("You have an ERROR!!!");
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


// Middleware for checking isLoggedin
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;