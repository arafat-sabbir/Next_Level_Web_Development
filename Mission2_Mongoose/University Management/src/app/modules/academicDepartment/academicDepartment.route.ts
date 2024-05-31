import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get('/get-academic-departments', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get('/get-academic-department/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  '/update-academic-department/:departmentId',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateSingleAcademicDepartment
);

export const academicDepartmentRoutes = router;
