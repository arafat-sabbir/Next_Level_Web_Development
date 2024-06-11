import AppError from '../../errors/AppError';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.const';
import { TSemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistrationModel from './semesterRegistration.model';

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
  const { academicSemester } = payload;
  const isAcademicSemesterExist = await AcademicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new Error('Invalid AcademicSemester Id');
  }
  const ongoingOrUpcomingSemester = await SemesterRegistrationModel.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (ongoingOrUpcomingSemester) {
    throw new Error(`An ${ongoingOrUpcomingSemester.status} Semester Already Exist !`);
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDb = async () => {
  const result = await SemesterRegistrationModel.find().populate('academicSemester');
  return result;
};

const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationFromDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const registeredSemester = await getSingleSemesterRegistrationFromDb(id);
  if (!registeredSemester) {
    throw new AppError(404, `Registered Semester With ${id} Not Found`);
  }
  if (registeredSemester?.status === RegistrationStatus.ENDED) {
    throw new Error('This Semester Already ENDED');
  }
  if (
    registeredSemester.status === RegistrationStatus.UPCOMING &&
    payload.status === RegistrationStatus.ENDED
  ) {
    throw new Error(
      `You Can't Change Status From ${RegistrationStatus.UPCOMING} To ${RegistrationStatus.ENDED}`
    );
  }
  if (
    registeredSemester.status === RegistrationStatus.ONGOING &&
    payload.status === RegistrationStatus.UPCOMING
  ) {
    throw new Error(
      `You Can't Change Status From ${RegistrationStatus.UPCOMING} To ${RegistrationStatus.ONGOING}`
    );
  }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationFromDb,
};
