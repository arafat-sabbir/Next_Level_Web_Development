import sendResponse from '../../../app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  console.log(result,"create academic department");
  sendResponse(res, { message: 'Academic Department Created Successfully', data: result });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  sendResponse(res, { message: 'Academic Department Retrieved Successfully', data: result });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
    req.params.departmentId
  );
  sendResponse(res, { message: 'Academic Department Retrieved Successfully', data: result });
});

const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDb(
    req.params.departmentId,
    req.body
  );
  sendResponse(res, {
    message: `Department For ${req.params.departmentId} Updated Successfully`,
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicDepartment,
  updateSingleAcademicDepartment,
};
