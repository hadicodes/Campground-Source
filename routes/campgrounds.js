const express = require("express"),
router        = express.Router();


// INDEX - Show all campgrounds
router.get('/campgrounds', function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds
            });
        }
    })
});


//NEW - SHOW NEW CAMPGROUND FORM
router.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
});


//CREATE -  Add new campground to DB
router.post('/campgrounds', function (req, res) {
    // get data from form and redirect to campgrounds page
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    }
    // Create a new Campground and add it to our db
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});


// SHOW - Show a more detailed description of a specified route (by :id
router.get("/campgrounds/:id", function (req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render the show page for that campground
            console.log(foundCampground);
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});


module.exports = router;