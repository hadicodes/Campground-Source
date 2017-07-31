const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('landing');
})

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "http://www.photosforclass.com/download/7626464792"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/5641024448"}
    ]
res.render('campgrounds');
});




app.listen(process.env.PORT || 8080, function () {
    console.log('NICE! YELPCAMP SERVER has startedon PORT 8080.');
});


