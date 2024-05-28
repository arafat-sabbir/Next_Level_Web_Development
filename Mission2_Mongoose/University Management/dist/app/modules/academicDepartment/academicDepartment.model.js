"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'academicfaculties' },
}, { timestamps: true });
const AcademicDepartmentModel = (0, mongoose_1.model)('academicdepartment', academicDepartmentSchema);
exports.default = AcademicDepartmentModel;
