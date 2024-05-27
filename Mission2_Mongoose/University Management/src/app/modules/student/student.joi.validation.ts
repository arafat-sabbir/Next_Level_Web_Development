import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
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
  middleName: Joi.string().required().messages({
    'string.base': 'Middle Name must be a string',
    'string.empty': 'Middle Name is required',
  }),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.pattern.base': '{#label} is not valid',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'string.empty': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'string.empty': 'Mother Contact Number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required',
  }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Local Guardian Present Address must be a string',
    'string.empty': 'Local Guardian Present Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().optional(),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Student Name is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of Birth must be a string',
    'string.empty': 'Date of Birth is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': '{#label} is not valid',
    'string.empty': 'Gender is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': '{#label} is not a valid email type',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local Guardian information is required',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').required().default('active').messages({
    'any.only': '{#label} is not valid',
    'string.empty': 'Status is required',
  }),
});

// export default studentValidationSchema;
