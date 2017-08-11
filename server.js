const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Landing page route
app.get('/', function (req, res) {
    res.render('landing');
})

// Show all campgrounds
app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "http://www.photosforclass.com/download/7626464792"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/5641024448"}
    ]
res.render('campgrounds', {campgrounds: campgrounds} );
});


// Show new campground form
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

// Create a new  campground
app.post('/campgrounds', function(req, res){
    res.send('you hit da post route');
    // get data from form and redirect to campgrounds array
    // redirect back to campgrounds page
});











// Server Port Listener
app.listen(process.env.PORT || 8080, function () {
    console.log('SUCCESS! visit PORT 8080');
});


