import express from 'express';
import {
  deleteSingleStudent,
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
} from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentZodValidationSchema } from './student.zod.validation';

const router = express.Router();

router.get('/get-students', getAllStudent);
router.get('/get-student/:id', getSingleStudent);
router.patch(
  '/update-student/:id',
  validateRequest(updateStudentZodValidationSchema),
  updateSingleStudent
);
router.delete('/delete-student/:id', deleteSingleStudent);

export const studentRoutes = router;
