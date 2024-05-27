import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result =await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);
  sendResponse(res, { message: 'Academic Semester Created Successfully', data: result });
});

export const AcademicSemesterControllers = { createAcademicSemester };
