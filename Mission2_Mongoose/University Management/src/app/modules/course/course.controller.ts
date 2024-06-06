import catchAsync from 'src/app/utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

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

// const updateAdmin = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { admin } = req.body;
//   const result = await CourseServices.updateAdminIntoDB(id, admin);

//   sendResponse(res, {
//     message: 'Admin is updated successfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    message: 'Course is deleted succesfully',
    data: result,
  });
});

export const CourseControllers = {
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
