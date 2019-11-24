import shortid from 'short-id';
import pool from "../db/connection";
import { bucketObj, itemObj} from "../db/sql";

export default class BucketHandler {
    static addBucket(request, response, next) {
        console.log(request.user);
        const {name, created_by} = request.body;
      pool
        .query(bucketObj, [name, created_by])
        .then(data => {
          return response.status(201).json({
            status: 201,
            data: data.rows[0]
          });
        })
        .catch(error =>
          response.status(500).json({
            status: 500,
            error: error.message
          })
        );
    }

    static addItem(request, response, next) {
        const values = {
            id: shortid.generate(),
            name: request.body.name,
            date_created: new Date(),
            date_modified: new Date(),
            done: false
        }

        // console.log(typeof(request.params.id));
      pool
        .query(itemObj, [values, new Date(), request.params.id])
        .then(data => {
          return response.status(201).json({
            status: 201,
            data: data.rows[0]
          });
        })
        .catch(error =>
          response.status(500).json({
            status: 500,
            error: error.message
          })
        );
    }
    // static loginUser(request, response, next) {
    //   /* POST login. */
    //   passport.authenticate("local", { session: false }, (err, user, info) => {
    //     if (err || !user) {
    //       return response.status(400).json({
    //         message: info,
    //         user: user
    //       });
    //     }
    //     request.login(user, { session: false }, err => {
    //       if (err) {
    //         response.send("err");
    //       }
    //       const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1d'});
    //       return response.json({ user: user.id, token });
    //     });
    //   })(request, response);
    // }
  }