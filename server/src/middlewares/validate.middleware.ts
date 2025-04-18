import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError } from "yup";

import { BadRequestError } from "errors/bad-request.error";

export const validationMiddleware =
  (schema: AnyObjectSchema) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validateSync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(error.errors[0]));
      }
      return next(new BadRequestError("Error in validation process."));
    }
  };
