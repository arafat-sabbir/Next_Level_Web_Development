import express from 'express';
import {
  createStudent,
  deleteSingleStudent,
  getAllStudent,
  getSingleStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudent);
router.get('/get-student/:id', getSingleStudent);
router.delete('/delete-student/:id', deleteSingleStudent);

export const studentRoute = router;
