import sendResponse from 'src/app/utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, { message: 'User Login Successful', data: result });
});

export const AuthController = {
  loginUser,
};
