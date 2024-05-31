import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/HandleZodError';

/**
 * Global error handler for Express.js applications.
 * Handles errors that occur during the request-response cycle.
 *
 * @param {Error} error - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Response} The JSON response containing the error message and status code.
 */
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Retrieve the status code from the error object, or default to 500.
  let statusCode = error.statusCode || 500;
  let stack = null;
  // Retrieve the error message from the error object, or default to 'Something Went Wrong'.
  let message = error.message || 'Something Went Wrong';

  let errorSources: TErrorSources = [
    {
      path: ' ',
      message: 'Something Went Wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.NODE_ENV === 'development' ? error.stack : null;
  }
  // Return a JSON response with the error message and status code.
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(stack && { stack }),
  });
};

export default globalErrorHandler;
