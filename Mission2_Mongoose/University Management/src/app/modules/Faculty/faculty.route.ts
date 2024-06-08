import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();
router.get('/get-faculty/:id', FacultyControllers.getSingleFaculty);
router.patch(
  '/update-faculty/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);
router.delete('/delete-faculty/:id', FacultyControllers.deleteFaculty);
router.get('/get-faculties', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
