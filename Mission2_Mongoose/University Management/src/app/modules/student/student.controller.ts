import { Request, Response } from 'express';
import {
  deleteSingleStudentFromDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
} from './student.service';
import { studentZodValidationSchema } from './student.zod.validation';

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
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
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
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

export { getAllStudent, getSingleStudent, deleteSingleStudent };
