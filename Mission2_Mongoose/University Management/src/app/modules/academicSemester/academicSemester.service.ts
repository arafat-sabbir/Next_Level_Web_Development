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

export const AcademicSemesterServices = { createAcademicSemesterIntoDb };
