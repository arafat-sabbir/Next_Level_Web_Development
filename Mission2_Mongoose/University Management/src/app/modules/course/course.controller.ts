import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const addNewCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body);
  sendResponse(res, { message: 'Course is created successfully', data: result });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    message: 'Course is deleted succesfully',
    data: result,
  });
});
const assignFacultiesToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesToCourseIntoDb(courseId, faculties);
  sendResponse(res, {
    message: 'Faculty Assigned To Course successfully',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesToCourseFromDb(courseId, faculties);
  sendResponse(res, {
    message: 'Faculty Remove From Course successfully',
    data: result,
  });
});
export const CourseControllers = {
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  addNewCourse,
  updateCourse,
  assignFacultiesToCourse,
  removeFacultiesFromCourse,
};
