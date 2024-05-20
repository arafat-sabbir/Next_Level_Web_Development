import express from 'express';
import {
  createStudent,
  getAllStudent,
  getSingleStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudent);
router.get('/get-student/:id', getSingleStudent);

export const studentRoute = router;
