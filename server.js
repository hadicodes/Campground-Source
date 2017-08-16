// DEPENDENCIES
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

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



// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);



// ****************************************************************************************
// ROUTES
// ****************************************************************************************

// Landing page route
app.get('/', function (req, res) {
    res.render('landing');
});

// Show all campgrounds
app.get('/campgrounds', function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    })
});



// SHOW NEW CAMPGROUND FORM
app.get('/campgrounds/new', function (req, res) {
    res.render('new.ejs');
});

// Create a new  campground
app.post('/campgrounds', function (req, res) {
    // get data from form and redirect to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name: name,
        image: image
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








// Server Port Listener
app.listen(process.env.PORT || 8080, function () {
    console.log('SUCCESS! visit PORT 8080');
});