import Joi from 'joi';
import pool from '../db/connection';
import { queryUsersByEmail } from '../db/sql';
import { newUserSchema, loginSchema } from '../utilities/validationSchema';


export default class UserValidation {
  static handleSignup(request, response, next) {
    const { error } = Joi.validate(request.body, newUserSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }

    pool.query(queryUsersByEmail, [request.body.email])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 409,
              error: 'Email already exist, please use another email or login.',
            });
        }
        next();
      });
  }

  static handleLogin(request, response, next) {
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          status: 400,
          error: error.details.map(d => d.context),
        });
      return false;
    }
    return next();
  }
}