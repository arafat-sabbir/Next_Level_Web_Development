import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);
  sendResponse(res, { message: 'Academic Faculty Created Successfully', data: result });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDb();
  sendResponse(res, { message: 'Academic Faculty Retrieved Successfully', data: result });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(req.params.facultyId);
  sendResponse(res, { message: 'Academic Faculty Retrieved Successfully', data: result });
});

const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateSingleAcademicFacultyFromDb(
    req.params.facultyId,
    req.body
  );
  sendResponse(res, {
    message: `Faculty For ${req.params.semesterId} Updated Successfully`,
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateSingleAcademicFaculty,
};
