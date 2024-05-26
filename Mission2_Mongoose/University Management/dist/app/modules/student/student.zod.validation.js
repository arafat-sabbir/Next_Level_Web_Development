"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentZodValidationSchema = void 0;
const zod_1 = require("zod");
// Define UserName Zod schema
const userNameZodValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, "First name can't be more than 20 characters long")
        .nonempty('First Name is required')
        .trim(),
    middleName: zod_1.z.string().nonempty('Middle Name is required'),
    lastName: zod_1.z.string().nonempty('Last Name is required'),
});
// Define Guardian Zod schema
const guardianZodValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().nonempty('Father Name is required'),
    fatherOccupation: zod_1.z.string().nonempty('Father Occupation is required'),
    fatherContactNo: zod_1.z.string().nonempty('Father Contact Number is required'),
    motherName: zod_1.z.string().nonempty('Mother Name is required'),
    motherOccupation: zod_1.z.string().nonempty('Mother Occupation is required'),
    motherContactNo: zod_1.z.string().nonempty('Mother Contact Number is required'),
});
// Define LocalGuardian Zod schema
const localGuardianZodValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty('Local Guardian Name is required'),
    occupation: zod_1.z.string().nonempty('Local Guardian Occupation is required'),
    presentAddress: zod_1.z.string().nonempty('Local Guardian Present Address is required'),
});
// Define Student Zod schema
const studentZodValidationSchema = zod_1.z.object({
    id: zod_1.z.string().optional(), // Optional field,
    password: zod_1.z.string().nonempty('Password Is Required'),
    name: userNameZodValidationSchema,
    dateOfBirth: zod_1.z.string().nonempty('Date of Birth is required'),
    gender: zod_1.z.enum(['male', 'female', 'others'], {
        required_error: 'Gender is required',
    }),
    email: zod_1.z.string().email('Invalid email address').nonempty('Email is required'),
    contactNo: zod_1.z.string().nonempty('Contact Number is required'),
    emergencyContactNumber: zod_1.z.string().nonempty('Emergency Contact Number is required'),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: zod_1.z.string().nonempty('Present Address is required'),
    permanentAddress: zod_1.z.string().nonempty('Permanent Address is required'),
    guardian: guardianZodValidationSchema,
    localGuardian: localGuardianZodValidationSchema,
    profileImage: zod_1.z.string().optional(),
    isActive: zod_1.z
        .enum(['active', 'blocked'], { required_error: 'Status is required' })
        .default('active'),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.studentZodValidationSchema = studentZodValidationSchema;
