const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

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