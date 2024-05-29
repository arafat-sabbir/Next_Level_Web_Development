import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterServices } from '../academicSemester/academicSemester.service';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentOnDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';
  // set manually generated id

  // findAcademic Semester
  const semesterData = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
    String(payload.admissionSemester)
  );
  userData.id = await generateStudentId(semesterData as TAcademicSemester);

  // create a user
  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const userService = { createStudentOnDb };
