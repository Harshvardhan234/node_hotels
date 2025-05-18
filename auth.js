const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./person"); // Adjust path as needed

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials:", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Simple password check (no hashing)
      const isPasswordMatch = user.password === password;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

// Export only Passport config
module.exports = passport;
