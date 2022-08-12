const express = require('express'),
  app = express(),
  path = require("path"),
  layouts = require('express-ejs-layouts'),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  passport = require("passport"),
  User = require("./models/user"),
  expressValidator = require("express-validator"),
  methodOverride = require("method-override"),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

//set the view engine as ejs
app.set("view engine", "ejs");

require('dotenv').config({path: __dirname + '/.env'});

//set port to the environment variable PORT value or 3000 if the former value is undefined
app.set("port", process.env.PORT || 3000);

//tell express to use body-parser for processing URL encoded and JSON as parameters
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(expressValidator());

app.use(layouts);

//defines the folder for static files (css f.e.)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// https://www.passportjs.org/concepts/authentication/sessions/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Google OAuth
let callbackURL = "";

if (app.settings.env === "development") {
    callbackURL = "http://localhost:3000/auth/google/ecopicks";
} else {
    callbackURL = "http://ecopicks.herokuapp.com/auth/google/ecopicks";
}

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: callbackURL,
    },
    function(accessToken, refreshToken, profile, cb) {
        // find user to authenticate or create user if they don't exist
        // findOrCreate needs mongoose-findorcreate package
        User.findOrCreate({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.errorCode = undefined;
  res.locals.errorMessage = undefined;
  if (req.query.q) {
      res.locals.query = req.query.q;
  } else {
      res.locals.query = undefined;
  }
  next();
});

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//all the routers:
app.use(require('./routers/userRouter'));
app.use(require('./routers/homeRouter'));
app.use(require('./routers/ecopicksBrandRouter'));
app.use(require('./routers/apiRouter'));
app.use(require('./routers/searchRouter'));
app.use(require('./routers/categoryRouter'));
app.use(require('./routers/contactRouter'));
app.use(require('./routers/recommendationRouter'));
app.use(require('./routers/errorRouter'));

module.exports = app;
