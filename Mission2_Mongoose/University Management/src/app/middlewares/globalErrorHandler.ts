import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = error.message || 'Something Went Wrong';
  return res.status(statusCode).json({ success: false, message, error });
};

export default globalErrorHandler;
