const express = require("express"),
 app = express(),
 bodyParser = require("body-parser"),
 mongoose = require("mongoose");

// mongoose connection
 mongoose.connect("mongodb://localhost/campground_source");

// middleware
// Use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
// use ejs as the view templating engine
app.set("view engine", "ejs");
// serve static files from public directory
app.use(express.static(process.cwd() + '/public'));


// *************************************
// ROUTES
// *************************************

// Landing page route
app.get('/', function (req, res) {
    res.render('landing');
})


var campgrounds = [{
        name: "Salmon Creek",
        image: "http://www.photosforclass.com/download/7626464792"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "http://www.photosforclass.com/download/5641024448"
    },
    {
        name: "Salmon Creek",
        image: "http://www.photosforclass.com/download/7626464792"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "http://www.photosforclass.com/download/5641024448"
    },
    {
        name: "Salmon Creek",
        image: "http://www.photosforclass.com/download/7626464792"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcEp1ld68tW01I2VSGeE24EZWn1IWSXzVfRtL5txozTyIKxpbXg"
    }

]
// Show all campgrounds
app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {
        campgrounds: campgrounds
    });
});


// Show new campground form
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
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});











// Server Port Listener
app.listen(process.env.PORT || 8080, function () {
    console.log('SUCCESS! visit PORT 8080');
});