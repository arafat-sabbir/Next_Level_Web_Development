import { z } from 'zod';
import { Months, SemesterCode, SemesterName } from './academicSemester.constant';

const createAcademicSemesterZodValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterName] as [string, ...string[]]),
    code: z.enum([...SemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = { createAcademicSemesterZodValidationSchema };
