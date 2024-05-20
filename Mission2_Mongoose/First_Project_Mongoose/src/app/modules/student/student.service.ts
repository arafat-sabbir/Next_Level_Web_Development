import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentOnDb = async (student: Student) => {
  const newStudent = await StudentModel.create(student);
  return newStudent;
};

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export { createStudentOnDb, getAllStudentFromDb, getSingleStudentFromDb };
