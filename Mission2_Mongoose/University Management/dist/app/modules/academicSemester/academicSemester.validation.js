"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createAcademicSemesterZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(['Autumn', 'Summer', 'Fall']),
        code: zod_1.z.enum(['01', '02', '03']),
        year: zod_1.z.date()
    }),
});
