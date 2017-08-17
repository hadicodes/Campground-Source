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
    image: String,
    descripton: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Create a new Campground and add it to our db
// Campground.create({
//     name: "FireSide Rock",
//     image: "https://farm1.staticflickr.com/7/5954480_34a881115f.jpg",
//     descripton: "This campground is known to have regular forest fires. Tread carefully, you have been Warned!"
// }, function (err, newlyCreated) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success");
//     }
// });



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
            res.render('index', {
                campgrounds: allCampgrounds
            });
        }
    })
});


//NEW - SHOW NEW CAMPGROUND FORM
app.get('/campgrounds/new', function (req, res) {
    res.render('new.ejs');
});

//CREATE -  Add new campground to DB
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


// SHOW - Show a more detailed description of a specified route (by :id
app.get("/campgrounds/:id", function (req, res) {
    // find the campground with a provided id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            // render the show page for that campground
            res.render('show', {campground: foundCampground});
        }
    });
});







// Server Port Listener
app.listen(process.env.PORT || 8080, function () {
    console.log('SUCCESS! visit PORT 8080');
});