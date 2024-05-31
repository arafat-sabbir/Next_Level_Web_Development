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

/**
 * Creates a student on the database.
 * @param password The password for the student. If null, the default password is used.
 * @param payload The payload containing the student's data.
 * @returns The newly created student.
 * @throws {AppError} If the creation of the user or the student fails.
 */
const createStudentOnDb = async (password: string, payload: TStudent) => {
  // Prepare user data
  const userData: Partial<TUser> = {};
  // Use the provided password, otherwise use the default password
  userData.password = password || (config.default_password as string);
  // Set the role of the user to 'student'
  userData.role = 'student';

  // Find the academic semester
  const semester = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
    String(payload.admissionSemester)
  );
  // Generate the student ID
  userData.id = await generateStudentId(semester as TAcademicSemester);

  const session = await mongoose.startSession();
  try {
    // Create a user
    session.startTransaction();
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed To Create User');
    }
    // Set the user ID and user reference in the payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create the student
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
