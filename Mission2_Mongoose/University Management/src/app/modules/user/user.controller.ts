import { userService } from './user.service';
import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createNewStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentOnDb(password, studentData);
  sendResponse(res, { message: 'Student Created Successfully', data: result });
});
const createNewFaculty = catchAsync(async (req, res) => {
  const { password, faculty: studentData } = req.body;
  const result = await userService.createFacultyIntoDB(password, studentData);
  sendResponse(res, { message: 'Faculty Created Successfully', data: result });
});
const createNewAdmin = catchAsync(async (req, res) => {
  const { password, admin: studentData } = req.body;
  const result = await userService.createAdminIntoDB(password, studentData);
  sendResponse(res, { message: 'Admin Created Successfully', data: result });
});

export const userControllers = { createNewStudent, createNewFaculty, createNewAdmin };
