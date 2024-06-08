import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import CourseModel from './course.model';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate({
      path: 'preRequisiteCourses.course',
    }),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const createCourseIntoDb = async (payload: TCourse): Promise<TCourse> => {
  const result = await CourseModel.create(payload);
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate({
    path: 'preRequisiteCourses.course',
  });
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await CourseModel.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const deletedCourse = await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

  if (!deletedCourse) {
    throw new AppError(400, 'Failed to delete student');
  }
  return deletedCourse;
};

export const CourseServices = {
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  createCourseIntoDb,
  updateCourseIntoDB,
};
