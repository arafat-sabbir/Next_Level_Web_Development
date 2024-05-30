import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterServices } from '../academicSemester/academicSemester.service';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentOnDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';

  // findAcademic Semester
  const semesterData = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
    String(payload.admissionSemester)
  );
  userData.id = await generateStudentId(semesterData as TAcademicSemester);
  const session = await mongoose.startSession();
  try {
    // create a user
    session.startTransaction();
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed To Create User');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent) {
      throw new AppError(400, 'Error Creating User');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message)
  }
};

export const userService = { createStudentOnDb };
