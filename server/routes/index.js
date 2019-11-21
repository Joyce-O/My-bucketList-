import express from 'express';

const homeRoute = express.Router();;

homeRoute.get('/api/v1', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: 'Hi welcome, drop you list here!'
    });
});

homeRoute.all('*', (request, response) => {
  response.status(404)
    .json({
      success: false,
      message: 'Oops! This page does not exist.'
    });
});

export default homeRoute;