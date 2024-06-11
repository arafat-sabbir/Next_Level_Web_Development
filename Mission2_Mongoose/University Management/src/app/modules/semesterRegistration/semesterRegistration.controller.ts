import catchAsync from '../../utils/catchAsync';
import { SemesterRegistrationService } from './semesterRegistration.service';
import sendResponse from '../../utils/sendResponse';

const create = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.createSemesterRegistrationIntoDb(req.body);
  sendResponse(res, { message: 'Semester Registered Successfully', data: result });
});
const getAll = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDb();
  sendResponse(res, { message: 'Semester Retrieved Successfully', data: result });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(
    req.params.id
  );
  sendResponse(res, { message: 'Semester Retrieved Successfully', data: result });
});

const updateSingle = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.updateSemesterRegistrationFromDb(
    req.params.id,
    req.body
  );
  sendResponse(res, { message: 'Semester Updated Successfully', data: result });
});

export const SemesterRegisterController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};
