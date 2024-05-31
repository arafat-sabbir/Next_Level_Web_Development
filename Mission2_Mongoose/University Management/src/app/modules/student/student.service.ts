import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find()
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
  console.log(payload);
  const result = StudentModel.findOneAndUpdate({ id },payload, { new: true });
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
