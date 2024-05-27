"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: { type: String, enum: academicSemester_constant_1.SemesterName, required: true },
    code: { type: String, enum: academicSemester_constant_1.SemesterCode, required: true },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: academicSemester_constant_1.Months, required: true },
    endMonth: { type: String, enum: academicSemester_constant_1.Months, required: true },
});
const AcademicSemesterModel = (0, mongoose_1.model)('academicSemester', AcademicSemesterSchema);
exports.default = AcademicSemesterModel;
