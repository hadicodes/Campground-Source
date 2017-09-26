// DEPENDENCIES
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");


// MONGOOSE CONNECTION
mongoose.connect("mongodb://localhost/campground_source", {
    useMongoClient: true
});

// MIDDLEWARE
// Use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
// USE EJS AS THE VIEW TEMPLATING ENGINE
app.set("view engine", "ejs");
// Serve static files from public directory
app.use(express.static(process.cwd() + '/public'));
// Invokes the seedDb function to remove all campgrounds and then add a few
seedDB();




// ****************************************************************************************
// ROUTES
// ****************************************************************************************

// Landing page route
app.get('/', function (req, res) {
    res.render('landing');
}); 

// INDEX - Show all campgrounds
app.get('/campgrounds', function (req, res) {
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
app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
});

//CREATE -  Add new campground to DB
app.post('/campgrounds', function (req, res) {
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
app.get("/campgrounds/:id", function (req, res) {
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






//======================================================
// COMMENTS ROUTES
//======================================================

// New Comments Form Route
app.get("/campgrounds/:id/comments/new", function (req, res) {
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



app.post('/campgrounds/:id/comments', function (req, res) {
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







// Server Port Listener
app.listen(process.env.PORT || 3000, function () {
    console.log('SUCCESS! visit PORT 8080');
});