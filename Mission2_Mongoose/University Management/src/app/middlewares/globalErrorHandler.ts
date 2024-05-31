import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import config from '../config';
import handleValidationError from '../errors/HandleValidationError';
import handleZodError from '../errors/HandleZodError';
import handleCastError from './HandleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';

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
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res: Response<TGenericErrorResponse>,
  next
) => {
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
    stack = config.NODE_ENV === 'development' && error.stack;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.NODE_ENV === 'development' && error.stack;
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.NODE_ENV === 'development' && error.stack;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.NODE_ENV === 'development' && error.stack;
  }
  // Return a JSON response with the error message and status code.
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    ...(stack && { stack }),
  });
};

export default globalErrorHandler;
