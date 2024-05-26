import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentOnDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';
  // set manually genereated id
  userData.id = '2030100001';
  // create a user
  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    // set id ,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userService = { createStudentOnDb };
