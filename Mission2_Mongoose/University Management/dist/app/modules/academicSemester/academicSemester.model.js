"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: { type: String, enum: ['Autumn', "Summer", "Fall"], required: true },
    code: { type: String, enum: ['01', '02', '03'], required: true },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
});
const AcademicSemesterModel = (0, mongoose_1.model)('academicSemester', AcademicSemesterSchema);
exports.default = AcademicSemesterModel;
