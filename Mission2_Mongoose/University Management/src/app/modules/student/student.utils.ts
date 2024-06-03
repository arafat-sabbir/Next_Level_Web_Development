import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

export const updateStudentData = (
  remainingStudentData: Partial<TStudent>,
  name: TUserName,
  guardian: TGuardian,
  localGuardian: TLocalGuardian
) => {
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  return modifiedUpdatedData;
};
