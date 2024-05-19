export type Student = {
  name: {
    firstName: string;
    middleName?: string;
    lastName?: string;
  };
  gender: 'male' | 'female' | 'others';
  dateOfBirth: number;
  contactNo: string;
  email: string;
  emergencyContactNumber: string;
  BloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    
  };
};
