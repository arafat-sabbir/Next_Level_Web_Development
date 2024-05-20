import { Student } from './student.interface';
import { studentModel } from './student.model';

const createStudentOnDb = async (student: Student) => {
  const newStudent = await studentModel.create(student);
  return newStudent;
};

const getAllStudentFromDb = async () => {
  const result = await studentModel.find();
  return result;
};



export { createStudentOnDb, getAllStudentFromDb };
