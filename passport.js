//passport.js
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import db from "./server/models/index";
import { verifyPassword } from "./server/utilities/passwordHandler";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
      // passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const row = await db.user.findOne({
          where: { email },
          raw: true
        });
        console.log("From passport", row);
        if (!row) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const isPassword = verifyPassword(password, row.password);
        console.log(verifyPassword(password, row.password));
        if (!isPassword) {
          return done(null, false, { message: "Incorrect email or password." });
        } else {
          const { isadmin, id, email, firstname, lastname } = row;
          const user = { isadmin, id, email, firstname, lastname };
          return done(null, user, { message: "Logged In Successfully" });
        }
      } catch (err) {
        return done(null, false, err.name);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      return db.user
        .findOne({
          where: {id: jwtPayload.id },
          raw: true
        })
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
