import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);

router.get('/get-academic-semesters', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/get-academic-semester/:id', AcademicSemesterControllers.getSingleAcademicSemester);

export const academicSemesterRoutes = router;
