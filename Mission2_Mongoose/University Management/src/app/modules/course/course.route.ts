import express from 'express';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.get('/get-courses', CourseControllers.getAllCourses);
router.get('/get-course/:id', CourseControllers.getSingleCourse);
router.delete('/delete-course/:id', CourseControllers.deleteCourse);

export const courseRoutes = router;
