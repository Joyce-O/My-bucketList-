import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pool from "../db/connection";
import { userObj} from "../db/sql";
const jwt = require("jsonwebtoken");
const passport = require("passport");
import 'dotenv/config';

dotenv.config();
export default class User {
  static registerUser(request, response, next) {
    const { firstname, lastname, email, phone, password } = request.body;
    const pswd = bcrypt.hashSync(password, 10);
    const values = [firstname, lastname, email, phone, pswd];
    pool
      .query(userObj, values)
      .then(data => {
        const { isadmin, id } = data.rows[0];

        const token = jwt.sign({
          isadmin,
          id,
          email,
          phone,
          firstname,
          lastname
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return response.status(201).json({
          status: 201,
          data: [{ user: id, token }]
        });
      })
      .catch(error =>
        response.status(500).json({
          status: 500,
          error: error.message
        })
      );
  }
  static loginUser(request, response, next) {
    /* POST login. */
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return response.status(400).json({
          message: info,
          user: user
        });
      }
      request.login(user, { session: false }, err => {
        if (err) {
          response.send("err");
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1d'});
        return response.json({ user: user.id, token });
      });
    })(request, response);
  }
}
