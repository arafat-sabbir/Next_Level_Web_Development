import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// import validator from 'validator';
import config from '../../config';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, "first name can't be More Than 20 character long"],
  },
  middleName: { type: String, required: [true, 'Middle Name is required'] },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is Not Valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Local Guardian Present Address is required'],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id Is Required'],
      unique: true,
      ref: 'User',
    },
    password: { type: String, required: true },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      message: '{VALUE} Is Not Valid',
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} Is Not A Valid Email Type',
      // },
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImage: { type: String },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

studentSchema.pre('save', async function (next) {
  const user = this;
  console.log(this);
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_solt_round));
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `;
});

export const StudentModel = model<TStudent>('Student', studentSchema);
