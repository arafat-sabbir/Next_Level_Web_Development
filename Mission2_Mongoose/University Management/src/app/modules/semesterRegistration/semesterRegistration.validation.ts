import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.const';
const createSemesterRegistration = z.object({
  body: z.object({
    academicSemester: z.string().nonempty(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.preprocess((arg) => new Date(arg as Date), z.date()),
    endDate: z.preprocess((arg) => new Date(arg as Date), z.date()),
    minCredit: z.number().min(1),
    maxCredit: z.number().min(1),
  }),
});

export const semesterRegistrationValidations = {
  createSemesterRegistration,
};
