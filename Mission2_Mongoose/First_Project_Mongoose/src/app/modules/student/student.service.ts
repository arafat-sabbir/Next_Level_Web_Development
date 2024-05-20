import { Student } from './student.interface';
import { studentModel } from './student.model';

const createStudentOnDb = async (student: Student) => {
  const newStudent = await studentModel.create(student);
  return newStudent;
};

export {createStudentOnDb};
