const User = require("../models/User");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Facebook login
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://consultame-app.herokuapp.com/auth/facebook/callback",
      profileFields: [
        "id",
        "profile_pic",
        "birthday",
        "first_name",
        "last_name",
        "email"
      ]
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookID: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          // If user already exists, update it with Facebook Login
          if (!user.facebookID) {
            user.email = profile.email;
            user.profile_pic = profile.profile_pic;
            user.name = profile.fist_name;
            user.surname = profile.last_name;
            user.birthday = profile.birthday;
            user.facebookID = profile.id;
            user.facebookAccessToken = accessToken;

            user.save();
          }
          return done(null, user);
        } else {
          const newUser = new user({
            email: profile.email,
            profile_pic: profile.profile_pic,
            name: profile.first_name,
            surname: profile.last_name,
            birthday: profile.birthday,
            facebookID: profile.id,
            facebookAccessToken: accessToken
          });
        }

        newUser.save(err => {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      });
    }
  )
);

module.exports = passport;