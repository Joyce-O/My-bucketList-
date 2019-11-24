import express from 'express';
// import UserValidation from '../middlewares.js/UserValidation';
import passport from "passport";
import BucketHandler from '../buckets/BucketHandler';


const bucket = express.Router();


bucket.post('/bucketlists/', passport.authenticate('jwt', {session: false}), BucketHandler.addBucket);
bucket.post('/bucketlists/:id/items/', passport.authenticate('jwt', {session: false}), BucketHandler.addItem);


export default bucket;