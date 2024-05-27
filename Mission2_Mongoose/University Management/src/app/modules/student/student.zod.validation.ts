import { z } from 'zod';

// Define UserName Zod schema
const userNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name can't be more than 20 characters long")
    .nonempty('First Name is required')
    .trim(),
  middleName: z.string().nonempty('Middle Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
});

// Define Guardian Zod schema
const guardianZodValidationSchema = z.object({
  fatherName: z.string().nonempty('Father Name is required'),
  fatherOccupation: z.string().nonempty('Father Occupation is required'),
  fatherContactNo: z.string().nonempty('Father Contact Number is required'),
  motherName: z.string().nonempty('Mother Name is required'),
  motherOccupation: z.string().nonempty('Mother Occupation is required'),
  motherContactNo: z.string().nonempty('Mother Contact Number is required'),
});

// Define LocalGuardian Zod schema
const localGuardianZodValidationSchema = z.object({
  name: z.string().nonempty('Local Guardian Name is required'),
  occupation: z.string().nonempty('Local Guardian Occupation is required'),
  presentAddress: z.string().nonempty('Local Guardian Present Address is required'),
});

// Define Student Zod schema
const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty('Password Is Required'),
    student: z.object({
      name: userNameZodValidationSchema,
      dateOfBirth: z.string().nonempty('Date of Birth is required'),
      gender: z.enum(['male', 'female', 'others'], {
        required_error: 'Gender is required',
      }),
      email: z.string().email('Invalid email address').nonempty('Email is required'),
      contactNo: z.string().nonempty('Contact Number is required'),
      emergencyContactNumber: z.string().nonempty('Emergency Contact Number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().nonempty('Present Address is required'),
      permanentAddress: z.string().nonempty('Permanent Address is required'),
      guardian: guardianZodValidationSchema,
      localGuardian: localGuardianZodValidationSchema,
      profileImage: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export { createStudentZodValidationSchema };
