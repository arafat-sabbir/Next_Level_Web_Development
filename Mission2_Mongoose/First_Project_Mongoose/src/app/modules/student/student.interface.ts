import { Model } from "mongoose";

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  presentAddress: string;
}

export interface Student {
  id?: string; // Make id optional
  password:string;
  name: UserName;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'others';
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Make bloodGroup optional
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
}

type StudentMethods = {
  isUserExists(id: string): Promise<Student>;
};
export type StudentModel = Model<Student, Record<string, never>, StudentMethods>;
