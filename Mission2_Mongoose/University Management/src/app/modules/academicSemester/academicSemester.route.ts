import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from 'src/app/middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  'create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);

export const academicSemesterRoutes = router;
