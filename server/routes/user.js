import express from 'express';
import UserValidation from '../middlewares.js/UserValidation';
import User from '../auth/User';


const user = express.Router();


user.post('/auth/signup', UserValidation.handleSignup, User.registerUser);
user.post('/auth/login', UserValidation.handleLogin, User.loginUser);


export default user;