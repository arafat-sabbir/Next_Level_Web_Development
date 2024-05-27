import express from 'express';
import { userControllers } from './user.controller';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  userControllers.createNewStudent
);

export const userRoutes = router;
