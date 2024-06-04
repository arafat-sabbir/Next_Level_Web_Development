import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import { updateStudentData } from './student.utils';

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let searchTerm = ' ';
  if (query.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeField.forEach((field) => delete queryObj[field]);
  console.log(query, queryObj);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .lean();

  let sort = 'createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 10;
  let skip = 0;
  if (query.page) {
    page = Number(query.page);
  }
  if (query.limit) {
    limit = Number(query.limit);
    skip = limit * (page - 1);
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);
  // field limiting for response
  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string)?.split(',')?.join(' ');
  }
  console.log(fields);
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
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
