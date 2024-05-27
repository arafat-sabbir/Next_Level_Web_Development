import { Model, Types } from 'mongoose';

export interface TUserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  presentAddress: string;
}

export interface TStudent {
  id?: string; // Make id optional
  user: Types.ObjectId;
  name: TUserName;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'others';
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Make bloodGroup optional
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
}

type StudentMethods = {
  isUserExists(id: string): Promise<TStudent>;
};
export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;
