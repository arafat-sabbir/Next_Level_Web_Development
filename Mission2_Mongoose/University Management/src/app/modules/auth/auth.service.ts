import { UserModel } from '../user/user.model';
import { TLogin } from './auth.interface';

const loginUser = async (payload: TLogin) => {
  const result = await UserModel.findById(payload.id);
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

export const authService = { loginUser };
