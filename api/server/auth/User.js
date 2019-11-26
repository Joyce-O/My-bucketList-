import dotenv from "dotenv";
import db from "../models/index";
const jwt = require("jsonwebtoken");
const passport = require("passport");
import "dotenv/config";
import { hashPassword } from '../utilities/passwordHandler';

dotenv.config();
export default class User {
  static async registerUser(request, response) {
    try {
      const { firstname, lastname, email, password } = request.body;
      const pswd = await hashPassword(password, 10);
      const user = await db.user
        .create({
          firstname,
          lastname,
          email,
          password: pswd,
        });
      if (!user) {
        return response.status(400).json({
          status: 400,
          error: 'email or password incorrect'
        });
      }
      const token = await jwt.sign(
        {
          id: user.id,
          isadmin: user.isadmin,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return response.status(200).json({
        status: 200,
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          token
        },
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: 'unexpected server error'
      });
    }
  }

  // static registerUser(request, response, next) {
  //   const { firstname, lastname, email, phone, password } = request.body;
  //   const pswd = bcrypt.hashSync(password, 10);
  //   db.user
  //     .create({
  //       firstname,
  //       lastname,
  //       email,
  //       phone,
  //       pswd
  //     })
  //     .then(data => {
  //       const { isadmin, id } = data.rows[0];

  //       const token = jwt.sign(
  //         {
  //           isadmin,
  //           id,
  //           email,
  //           phone,
  //           firstname,
  //           lastname
  //         },
  //         process.env.JWT_SECRET,
  //         { expiresIn: "1d" }
  //       );

  //       return response.status(201).json({
  //         status: 201,
  //         data: [{ user: id, token }]
  //       });
  //     })
  //     .catch(error =>
  //       response.status(500).json({
  //         status: 500,
  //         error: error.message
  //       })
  //     );
  // }
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
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1d"
        });
        return response.json({ user: user.id, token });
      });
    })(request, response);
  }
}
