import { NextFunction, Request, Response } from 'express';
import {
  deleteSingleStudentFromDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
} from './student.service';

const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Students Retrieved Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student Retrieved Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllStudent, getSingleStudent, deleteSingleStudent };
