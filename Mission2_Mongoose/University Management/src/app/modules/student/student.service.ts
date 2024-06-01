import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = ' ';
  if (query.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const result = await StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
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
const updateSingleStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
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
