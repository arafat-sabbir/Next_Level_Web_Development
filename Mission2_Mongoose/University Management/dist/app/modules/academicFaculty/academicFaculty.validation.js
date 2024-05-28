"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidationSchema = void 0;
const zod_1 = require("zod");
const academicFacultyValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Academic Semester Must Be String',
    })
        .nonempty(),
});
exports.academicFacultyValidationSchema = academicFacultyValidationSchema;
