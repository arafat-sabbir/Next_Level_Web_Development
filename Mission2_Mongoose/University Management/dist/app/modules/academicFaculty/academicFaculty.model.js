"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
});
const AcademicFacultyModel = (0, mongoose_1.model)('academicFacultyModel', academicFacultySchema);
exports.default = AcademicFacultyModel;
