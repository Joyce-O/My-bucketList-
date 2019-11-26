import express from 'express';
// import UserValidation from '../middlewares.js/UserValidation';
import passport from "passport";
import BucketHandler from '../buckets/BucketHandler';


const bucket = express.Router();


bucket.post('/bucketlists/', passport.authenticate('jwt', {session: false}), BucketHandler.addBucket);
bucket.post('/bucketlists/:id/items/', passport.authenticate('jwt', {session: false}), BucketHandler.addItem);
bucket.get('/bucketlists/', passport.authenticate('jwt', {session: false}), BucketHandler.getBuckets);
bucket.get('/bucketlists/:id', passport.authenticate('jwt', {session: false}), BucketHandler.getABucket);
bucket.get('/bucketlists/:id/items', passport.authenticate('jwt', {session: false}), BucketHandler.getItems);
bucket.get('/bucketlists/:bucketId/items/:id', passport.authenticate('jwt', {session: false}), BucketHandler.getAnItem);
bucket.put('/bucketlists/:id', passport.authenticate('jwt', {session: false}), BucketHandler.updateBucket);
bucket.put('/bucketlists/:bucketId/items/:id', passport.authenticate('jwt', {session: false}), BucketHandler.updateAnItem);
bucket.delete('/bucketlists/:id', passport.authenticate('jwt', {session: false}), BucketHandler.deleteABucket);
bucket.delete('/bucketlists/:parent_id/items/:id', passport.authenticate('jwt', {session: false}), BucketHandler.deleteAnItem);









export default bucket;