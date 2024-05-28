import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Semester Must Be String',
    })
    .nonempty(),
});
const updateAcademicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Semester Must Be String',
    })
    .nonempty(),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
