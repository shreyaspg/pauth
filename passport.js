const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./configuration/index");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;

// JSON web Token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        //   find a User specified in token
        const user = await User.findById(payload.sub);

        //  User doesn't exist
        if (!user) {
          return done(null, false);
        }
        // Else, return User
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find User given email
        const user = await User.findOne({ email });
        // If not handle it
        if (!user) {
          return done(null, false);
        }
        // Check password
        const isMatch = await user.isValidPassword(password);
        // hanlde password error
        if (!isMatch) {
          return done(null, false);
        }
        // Else, return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
