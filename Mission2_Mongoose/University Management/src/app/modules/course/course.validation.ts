import { z } from 'zod';

const preRequisiteCoursesValidation = z.object({
  course: z.string().nonempty('Course is required'),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string().nonempty('Course Title is required'),
    prefix: z.string().nonempty('Course Prefix is required'),
    code: z.number(),
    credit: z.string().nonempty('Course Credit is required'),
    description: z.string().optional(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
  }),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.string().optional(),
    description: z.string().optional(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
  }),
});

export const courseValidation = { createCourseValidation, updateCourseValidation };
