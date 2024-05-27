import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error(`Invalid Code For Name ${payload.name}`);
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};
const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemesterModel.findById({ _id: id });
  return result;
};
const updateSingleAcademicSemesterFromDb = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (payload.name) {
    if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
      throw new Error(`Invalid Code For Name ${payload.name}`);
    }
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate({ id }, { payload }, { new: true });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  updateSingleAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
};
