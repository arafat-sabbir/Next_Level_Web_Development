import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Middleware to validate incoming request body using Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema used for validation.
 * @returns {Function} - The middleware function.
 */
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the request body using the provided schema.
      await schema.parseAsync({ body: req.body });
      // Continue to the next middleware.
      next();
    } catch (error) {
      // Pass the error to the next middleware if validation fails.
      next(error);
    }
  };
};

export default validateRequest;

