import {
  deleteSingleStudentFromDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  updateSingleStudentFromDb,
} from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res, next) => {
  try {
    const result = await getAllStudentFromDb(req.query);
    sendResponse(res, { message: 'Students Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
});
const updateSingleStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { student } = req.body;
    const result = await updateSingleStudentFromDb(id, student);
    sendResponse(res, { message: 'Student Updated Successfully', data: result });
  } catch (error) {
    next(error);
  }
});

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Deleted Successfully', data: result });
  } catch (error) {
    next(error);
  }
});

export { getAllStudent, getSingleStudent, deleteSingleStudent, updateSingleStudent };
