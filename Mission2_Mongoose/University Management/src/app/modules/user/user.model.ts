import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, TUserModel } from './user.interface';
import config from '../../config/index';

const userSchema = new Schema<TUser, TUserModel>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_solt_round));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return UserModel.findOne({ id });
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  password: string
) {
  return bcrypt.compare(plainTextPassword, password);
};
export const UserModel = model<TUser, TUserModel>('User', userSchema);
