import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get('/get-academic-faculties', AcademicFacultyControllers.getAllAcademicFaculty);
router.get('/get-academic-faculty/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.put(
  '/update-academic-faculty/:facultyId',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateSingleAcademicFaculty
);

export const academicFacultyRoutes = router;
