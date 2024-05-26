import { Request, Response } from 'express'; // Ensure this import exists
import { userService } from './user.service';

const createNewStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userService.createStudentOnDb(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: error.message || error,
    });
  }
};

export const userControllers = { createNewStudent };
