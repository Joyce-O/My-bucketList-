//passport.js
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import { queryUsersByEmail } from "./server/db/sql";
import pool from "./server/db/connection";
import { verifyPassword } from "./server/utilities/passwordHandler";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
      // passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const data = await pool.query(queryUsersByEmail, [email]);

        if (data.rowCount === 0) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const isPassword = await verifyPassword(
          password,
          data.rows[0].password
        );

        if (!isPassword) {
          return done(null, false, { message: "Incorrect email or password." });
        } else {
          const {
            isadmin,
            id,
            email,
            phone,
            firstname,
            lastname
          } = data.rows[0];
          const user = { isadmin, id, email, phone, firstname, lastname };
          return done(null, user, { message: "Logged In Successfully" });
        }
      } catch (err) {
        return done(null, false, err.name);
      }
    }
  )
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
},
(jwtPayload, done) => {

    return pool.query(queryUsersByEmail, [jwtPayload.id])
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
}
));
