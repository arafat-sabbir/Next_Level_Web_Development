import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseFacultyModel, CourseModel } from './course.model';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import mongoose from 'mongoose';
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
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Basic course info update
    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(id, courseRemainingData, {
      new: true,
      runValidators: true,
      session,
    });

    // Check if there are any prerequisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      if (deletedPreRequisites.length > 0) {
        const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: { course: { $in: deletedPreRequisites } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        if (!deletedPreRequisiteCourses) {
          console.log('deletedPreRequisiteCourses', deletedPreRequisiteCourses);
          throw new AppError(400, 'Failed to update course');
        }
      }

      // Filter out the new course fields
      const newPreRequisites = preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
      if (newPreRequisites.length > 0) {
        const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );
        if (!newPreRequisiteCourses) {
          console.log('newPreRequisiteCourses', newPreRequisiteCourses);
          throw new AppError(400, 'Failed to update course');
        }
      }
    }
    await session.commitTransaction();
    session.endSession();
    const result = await CourseModel.findById(id).populate('preRequisiteCourses.course');
    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const deletedCourse = await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

  if (!deletedCourse) {
    throw new AppError(400, 'Failed to delete student');
  }
  return deletedCourse;
};
const assignFacultiesToCourseIntoDb = async (
  id: string,
  payload: Omit<TCourseFaculty, 'course'>
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    { $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true }
  );
  return result;
};
export const CourseServices = {
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  createCourseIntoDb,
  updateCourseIntoDB,
  assignFacultiesToCourseIntoDb,
};
