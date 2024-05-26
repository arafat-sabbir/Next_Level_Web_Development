import { NextFunction, Request, Response } from 'express'; // Ensure this import exists
import { userService } from './user.service';
import sendResponse from '../../../app/utils/sendResponse';

const createNewStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userService.createStudentOnDb(password, studentData);
    sendResponse(res, { message: 'Student Created Successfully', data: result });
  } catch (error) {
    next(error);
  }
};

export const userControllers = { createNewStudent };
