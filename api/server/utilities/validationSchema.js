  
import Joi from 'joi';

export const newUserSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid first name is required '),
  lastname: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid last name is required'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email is required'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password is required'),
});

export const loginSchema = {
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email is required'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password is required'),
};

export const addBucketSchema = {
    name: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid name is required '),
  };