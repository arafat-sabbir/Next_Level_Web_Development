import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLogin) => {
  const user = await UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new Error('User not found');
  }
  const isDeleted = user.isDeleted;
  const isBlocked = user.status;
  if (isBlocked === 'blocked') {
    throw new AppError(400, 'Forbidden Access Contact Admin For Information');
  }
  if (isDeleted) {
    throw new AppError(404, 'User not found');
  }
  const passwordMatched = await UserModel.isPasswordMatched(payload.password, user.password);
  if (!passwordMatched) {
    throw new AppError(400, 'Wrong Password');
  }
  return { access: 'Granted' };
};

export const authService = { loginUser };
