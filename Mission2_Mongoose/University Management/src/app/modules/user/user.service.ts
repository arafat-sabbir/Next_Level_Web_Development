import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterServices } from '../academicSemester/academicSemester.service';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model';
import { FacultyModel } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';

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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(payload.academicDepartment);

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = { createStudentOnDb, createAdminIntoDB, createFacultyIntoDB };
