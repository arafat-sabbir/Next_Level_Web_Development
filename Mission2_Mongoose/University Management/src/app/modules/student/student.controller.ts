import { NextFunction, Request, Response } from 'express';
import {
  deleteSingleStudentFromDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
} from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllStudentFromDb();
    sendResponse(res, { message: 'Students Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Retrieved Successfully', data: result });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStudentFromDb(id);
    sendResponse(res, { message: 'Student Deleted Successfully', data: result });
  } catch (error) {
    next(error);
  }
};

export { getAllStudent, getSingleStudent, deleteSingleStudent };
