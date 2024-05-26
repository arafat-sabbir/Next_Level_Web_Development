import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserOnDb = async (user) => {
  // const newStudent = await StudentModel.create(student); build In Static Method
  const newStudent =await UserModel.create(user); // built in instance method
  return newStudent;
};

export const userService = { createUserOnDb };
