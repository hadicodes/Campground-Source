// DEPENDENCIES
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

    const campgroundRoutes = ("./routes/comments.js"),
          commentRoutes = ("./routes/comments.js"),
          indexRoutes = ("./routes/comments.js");


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


//======================================================
//PASSPORT CONFIGURATION
//======================================================
app.use(require("express-session")({
    secret: "Rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
}));
// In an Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




// Server Port Listener
app.listen(process.env.PORT || 3000, function () {
    console.log('SUCCESS! visit PORT 8080');
});