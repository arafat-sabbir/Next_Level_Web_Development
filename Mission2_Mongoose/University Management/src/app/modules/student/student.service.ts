/**
 * The StudentService module contains functions to interact with the database
 * for operations related to students.
 * @module services/student
 */

import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import { updateStudentData } from './student.utils';
import QueryBuilder from '../../../app/builder/QueryBuilder';
import { searchableFields } from './student.constant';

/**
 * Function to get all students from the database.
 * @param query - The query parameters for filtering the results.
 * @returns A Promise that resolves to an array of students.
 */
const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query
  );
  studentQuery.search(searchableFields).filter().sort().paginate().fields();
  const result = await studentQuery.modelQuery.lean();
  return result;
};

/**
 * Function to get a single student from the database.
 * @param id - The ID of the student to retrieve.
 * @returns A Promise that resolves to the student object.
 */
const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .lean();
  return result;
};

/**
 * Function to update a single student in the database.
 * @param id - The ID of the student to update.
 * @param payload - The payload containing the updated data.
 * @returns A Promise that resolves to the updated student object.
 */
const updateSingleStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData = updateStudentData(
    remainingStudentData,
    name as TUserName,
    guardian as TGuardian,
    localGuardian as TLocalGuardian
  );
  const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

/**
 * Function to delete a single student from the database.
 * @param id - The ID of the student to delete.
 * @returns A Promise that resolves to an object containing the deleted student and user.
 */
const deleteSingleStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.updateOne(
      { id },
      { isDeleted: true },
      { session, new: true }
    );
    if (!deletedStudent) {
      throw new Error('Error Deleting Student');
    }
    const deletedUser = await UserModel.updateOne(
      { id },
      { isDeleted: true },
      { session, new: true }
    );
    if (!deletedUser) {
      throw new Error('Error Deleting User');
    }
    await session.commitTransaction();
    await session.endSession();
    return { deletedStudent, deletedUser };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Error Deleting User And Student');
  }
};

export {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
  updateSingleStudentFromDb,
};

