import { StudentModel } from './student.model';

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id } }]);
  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export { getAllStudentFromDb, getSingleStudentFromDb, deleteSingleStudentFromDb };
