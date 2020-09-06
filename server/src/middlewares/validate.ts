import Joi, { ObjectSchema, ValidationError } from 'joi';
import { Request } from 'express';

import { catchError } from '../utils';
import { RequestHandler } from 'express';
import { AppError } from '../utils/appError';

export const validateSchemas = {
  register: Joi.object({
    username: Joi.string().min(2).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  }),
};

export const validate = (
  schema: ObjectSchema,
  prop: keyof Request
): RequestHandler =>
  catchError((req, _res, next) => {
    const { error } = schema.validate(req[prop], { abortEarly: false });
    if (error) {
      throw new AppError(422, 'Invalid input values.', formatError(error));
    }

    next();
  });

const formatError = (error: ValidationError) => {
  return error.details.reduce<{ [key: string]: string }>((acc, curr) => {
    acc[curr.path[0]] = curr.message;
    return acc;
  }, {});
};
