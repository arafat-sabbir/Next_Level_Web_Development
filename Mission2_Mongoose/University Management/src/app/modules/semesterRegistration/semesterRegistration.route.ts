import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegisterController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/register-semester',
  validateRequest(semesterRegistrationValidations.createSemesterRegistration),
  SemesterRegisterController.create
);

router.get('/get-registered-semesters', SemesterRegisterController.getAll);
router.get('/get-registered-semester/:id', SemesterRegisterController.getSingle);
router.patch('/update-registered-semester/:id', SemesterRegisterController.updateSingle);
export const semesterRegistrationRoutes = router;
