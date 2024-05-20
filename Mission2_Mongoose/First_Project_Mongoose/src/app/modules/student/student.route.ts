import express from 'express';
import { createStudent, getAllStudent } from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudent);
router.get('/get-student/:id', getAllStudent);

export const studentRoute = router;
