"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .max(20)
        .required()
        .regex(/^[A-Z][a-zA-Z]*$/)
        .messages({
        'string.base': 'First Name must be a string',
        'string.empty': 'First Name is required',
        'string.max': "First Name can't be more than 20 characters long",
        'string.pattern.base': '{#label} is not in the correct format',
    }),
    middleName: joi_1.default.string().required().messages({
        'string.base': 'Middle Name must be a string',
        'string.empty': 'Middle Name is required',
    }),
    lastName: joi_1.default.string()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .messages({
        'string.base': 'Last Name must be a string',
        'string.empty': 'Last Name is required',
        'string.pattern.base': '{#label} is not valid',
    }),
});
const guardianValidationSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required().messages({
        'string.base': 'Father Name must be a string',
        'string.empty': 'Father Name is required',
    }),
    fatherOccupation: joi_1.default.string().required().messages({
        'string.base': 'Father Occupation must be a string',
        'string.empty': 'Father Occupation is required',
    }),
    fatherContactNo: joi_1.default.string().required().messages({
        'string.base': 'Father Contact Number must be a string',
        'string.empty': 'Father Contact Number is required',
    }),
    motherName: joi_1.default.string().required().messages({
        'string.base': 'Mother Name must be a string',
        'string.empty': 'Mother Name is required',
    }),
    motherOccupation: joi_1.default.string().required().messages({
        'string.base': 'Mother Occupation must be a string',
        'string.empty': 'Mother Occupation is required',
    }),
    motherContactNo: joi_1.default.string().required().messages({
        'string.base': 'Mother Contact Number must be a string',
        'string.empty': 'Mother Contact Number is required',
    }),
});
const localGuardianValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.base': 'Local Guardian Name must be a string',
        'string.empty': 'Local Guardian Name is required',
    }),
    occupation: joi_1.default.string().required().messages({
        'string.base': 'Local Guardian Occupation must be a string',
        'string.empty': 'Local Guardian Occupation is required',
    }),
    presentAddress: joi_1.default.string().required().messages({
        'string.base': 'Local Guardian Present Address must be a string',
        'string.empty': 'Local Guardian Present Address is required',
    }),
});
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    name: userNameValidationSchema.required().messages({
        'object.base': 'Student Name is required',
    }),
    dateOfBirth: joi_1.default.string().required().messages({
        'string.base': 'Date of Birth must be a string',
        'string.empty': 'Date of Birth is required',
    }),
    gender: joi_1.default.string().valid('male', 'female', 'others').required().messages({
        'any.only': '{#label} is not valid',
        'string.empty': 'Gender is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': '{#label} is not a valid email type',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.base': 'Contact Number must be a string',
        'string.empty': 'Contact Number is required',
    }),
    emergencyContactNumber: joi_1.default.string().required().messages({
        'string.base': 'Emergency Contact Number must be a string',
        'string.empty': 'Emergency Contact Number is required',
    }),
    bloodGroup: joi_1.default.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    presentAddress: joi_1.default.string().required().messages({
        'string.base': 'Present Address must be a string',
        'string.empty': 'Present Address is required',
    }),
    permanentAddress: joi_1.default.string().required().messages({
        'string.base': 'Permanent Address must be a string',
        'string.empty': 'Permanent Address is required',
    }),
    guardian: guardianValidationSchema.required().messages({
        'object.base': 'Guardian information is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'object.base': 'Local Guardian information is required',
    }),
    profileImage: joi_1.default.string().optional(),
    isActive: joi_1.default.string().valid('active', 'blocked').required().default('active').messages({
        'any.only': '{#label} is not valid',
        'string.empty': 'Status is required',
    }),
});
// export default studentValidationSchema;
