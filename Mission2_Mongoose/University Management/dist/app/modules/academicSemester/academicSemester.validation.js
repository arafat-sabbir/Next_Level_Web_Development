"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.SemesterName]),
        code: zod_1.z.enum([...academicSemester_constant_1.SemesterCode]),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
    }),
});
const updateAcademicSemesterZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.SemesterName]).optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.SemesterCode]).optional(),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
    }),
});
exports.AcademicSemesterValidation = { createAcademicSemesterZodValidationSchema, updateAcademicSemesterZodValidationSchema };
