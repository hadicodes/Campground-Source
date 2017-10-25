const express = require("express"),
router        = express.Router();


// ****************************************************************************************
// ROUTES
// ****************************************************************************************

// Landing page route
router.get('/', function (req, res) {
    res.render('landing');
});


//======================================================
//AUTH ROUTES
//======================================================

// show register form
router.get("/register", function (req, res) {
    res.render("register");
});
//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

const express = require("express"),
router        = express.Router();


//  LOGIN ROUTE
router.get('/login', function (req, res) {
    res.render("login");
});

// Handle Login Logic 
router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {});


// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
 });
 

// Middleware for checking isLoggedin
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;