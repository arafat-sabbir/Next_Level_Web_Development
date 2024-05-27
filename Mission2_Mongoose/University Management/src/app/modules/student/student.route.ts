import express from 'express';
import { deleteSingleStudent, getAllStudent, getSingleStudent } from './student.controller';

const router = express.Router();

router.get('/get-students', getAllStudent);
router.get('/get-student/:id', getSingleStudent);
router.delete('/delete-student/:id', deleteSingleStudent);

export const studentRoutes = router;
