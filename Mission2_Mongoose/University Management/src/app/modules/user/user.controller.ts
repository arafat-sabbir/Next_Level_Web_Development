import { NextFunction, Request, RequestHandler, Response } from 'express'; // Ensure this import exists
import { userService } from './user.service';
import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createNewStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentOnDb(password, studentData);
  sendResponse(res, { message: 'Student Created Successfully', data: result });
});

export const userControllers = { createNewStudent };
