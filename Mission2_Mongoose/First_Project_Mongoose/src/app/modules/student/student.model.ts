import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, "first name can't be More Than 20 character long"],
    // validate: {
    //   validator: function (value: string) {
    //     const rightValue = value.charAt(0).toUpperCase() + value.slice(1);
    //     return value === rightValue;
    //   },
    //   message: '{VALUE} Is Not On Capitalize Format',
    // },
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

const guardianSchema = new Schema<Guardian>({
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

const localGuardianSchema = new Schema<LocalGuardian>({
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

const studentSchema = new Schema<Student>({
  id: { type: String, unique: true },
  name: { type: userNameSchema, required: [true, 'Student Name is required'] },
  dateOfBirth: { type: String, required: [true, 'Date of Birth is required'] },
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
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: [true, 'Status is required'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
