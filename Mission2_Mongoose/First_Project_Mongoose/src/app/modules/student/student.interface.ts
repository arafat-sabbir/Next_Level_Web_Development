export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  presentAddress: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  contactNo: string;
  email: string;
  emergencyContactNumber: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
