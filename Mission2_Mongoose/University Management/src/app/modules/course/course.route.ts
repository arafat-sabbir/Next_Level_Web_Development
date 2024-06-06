import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/add-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  CourseControllers.addNewCourse
);
router.get('/get-courses', CourseControllers.getAllCourses);
router.get('/get-course/:id', CourseControllers.getSingleCourse);
router.delete('/delete-course/:id', CourseControllers.deleteCourse);

export const courseRoutes = router;
