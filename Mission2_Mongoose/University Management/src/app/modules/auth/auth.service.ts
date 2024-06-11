import config from '../../config';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLogin } from './auth.interface';
import jwt from 'jsonwebtoken';

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

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    config.jwt_access_secret as string,
    {
      expiresIn: '10d',
    }
  );

  return { accessToken, needsPasswordChange: user.needsPasswordChange };
};

export const authService = { loginUser };
