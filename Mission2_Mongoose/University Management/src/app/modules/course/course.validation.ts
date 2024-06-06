import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Course Title is required'),
    prefix: z.string().nonempty('Course Prefix is required'),
    code: z.number(),
    credit: z.number(),
    description: z.string().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number(),
    description: z.string().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
