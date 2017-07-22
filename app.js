const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get('/', function(){
    res.send('Landing Page soon');
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('NICE! The yelpcamp server has started.');
})