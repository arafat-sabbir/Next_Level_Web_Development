import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFacultyModel from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};
const getAllAcademicFacultyFromDb = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: id });
  return result;
};

const updateSingleAcademicFacultyFromDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

export const AcademicFacultyServices = {
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  createAcademicFacultyIntoDb,
  updateSingleAcademicFacultyFromDb,
};
