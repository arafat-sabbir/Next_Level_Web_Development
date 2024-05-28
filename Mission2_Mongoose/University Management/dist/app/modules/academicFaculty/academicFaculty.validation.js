"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const createAcademicFacultyValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Academic Semester Must Be String',
    })
        .nonempty(),
});
const updateAcademicFacultyValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Academic Semester Must Be String',
    })
        .nonempty(),
});
exports.AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};
