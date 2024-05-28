import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Semester Must Be String',
    })
    .nonempty(),
});

export { academicFacultyValidationSchema };
