const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('landing');
})


app.listen(process.env.PORT || 8080, function () {
    console.log('NICE! The YELPCAMP SERVER has started.');
});


