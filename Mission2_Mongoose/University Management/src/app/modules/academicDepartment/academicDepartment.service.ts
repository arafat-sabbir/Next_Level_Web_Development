import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartmentModel from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
  return result;
};

const updateSingleAcademicDepartmentFromDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  createAcademicDepartmentIntoDb,
  updateSingleAcademicDepartmentFromDb,
};
