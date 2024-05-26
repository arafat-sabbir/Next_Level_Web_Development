import { RequestHandler } from 'express';
import {
  deleteSingleStudentFromDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
} from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await getAllStudentFromDb();
    sendResponse(res, { message: 'Students Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Deleted Successfully', data: result });
  } catch (error) {
    next(error);
  }
};

export { getAllStudent, getSingleStudent, deleteSingleStudent };
