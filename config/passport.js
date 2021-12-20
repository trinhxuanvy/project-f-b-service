const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local.user.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            message: "Tài khoản không tồn tại",
            type: "error",
          });
        }

        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Mật khẩu không đúng",
            type: "error",
          });
        }

        if (user.status == false) {
          return done(null, false, {
            message: "Tài khoản đã bị khóa",
            type: "warning",
          });
        }

        return done(null, user);
      });
    }
  )
);
