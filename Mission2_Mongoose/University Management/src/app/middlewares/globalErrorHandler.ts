import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const globalErrorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something Went Wrong';
  return res.status(statusCode).json({ success: false, message, error });
};

export default globalErrorHandler;
