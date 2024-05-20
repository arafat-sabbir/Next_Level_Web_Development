import { Request, Response } from 'express';
import {
  createStudentOnDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
} from './student.service';

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const result = await createStudentOnDb(student);
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage = isError(error) ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: errorMessage,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Students Retrieved Successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage = isError(error) ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: errorMessage,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student Retrieved Successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage = isError(error) ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: errorMessage,
    });
  }
};

export { createStudent, getAllStudent, getSingleStudent };
