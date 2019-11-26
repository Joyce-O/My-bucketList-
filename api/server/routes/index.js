import express from 'express';
import swaggerDocument from '../../documentation.json';
import swaggerUi from 'swagger-ui-express';

import user from './user';
import bucket from './bucket'

const router = express.Router();;

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/', user);
router.use('/', bucket);

router.get('/', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: 'Hi welcome to bucketlist, get started already!'
    });
});

router.all('*', (request, response) => {
  response.status(404)
    .json({
      success: false,
      message: 'Oops! This page does not exist.'
    });
});

export default router;