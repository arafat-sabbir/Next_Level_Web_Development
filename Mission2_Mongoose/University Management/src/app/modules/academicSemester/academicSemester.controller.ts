import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);
  sendResponse(res, { message: 'Academic Semester Created Successfully', data: result });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();
  sendResponse(res, { message: 'Academic Semester Retrieved Successfully', data: result });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
    req.params.semesterId
  );
  sendResponse(res, { message: 'Academic Semester Retrieved Successfully', data: result });
});

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.updateSingleAcademicSemesterFromDb(
    req.params.semesterId,
    req.body
  );
  sendResponse(res, {
    message: `Product For ${req.params.semesterId} Updated Successfully`,
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
