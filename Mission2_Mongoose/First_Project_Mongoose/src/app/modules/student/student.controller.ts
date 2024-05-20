import { Request, Response } from 'express';
import { createStudentOnDb } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await createStudentOnDb(student);
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      data: error,
    });
  }
};

export { createStudent };
