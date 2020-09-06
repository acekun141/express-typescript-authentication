import * as Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../_exception";

export function validation(schema: Joi.Schema) {
  const options: Joi.AsyncValidationOptions = {
    abortEarly: false,  // include all errors
    allowUnknown: true,  // ignore unknown props
    stripUnknown: true,  // remove unknown props
  }
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      next(new HttpException(400, `${error.details.map(x => x.message).join(', ')}`));
    } else {
      req.body = value;
      next();
    }
  };
}