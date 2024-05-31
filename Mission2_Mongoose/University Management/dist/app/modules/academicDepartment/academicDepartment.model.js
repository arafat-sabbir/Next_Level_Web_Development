"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Define the model schema for the academic department
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }, // Name of the department
    academicFaculty: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'academicFaculties' }, // Reference to the faculty it belongs to
}, { timestamps: true });
// Middleware to check if the department already exists before saving
academicDepartmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDepartMentExist = yield AcademicDepartmentModel.findOne({ name: this.name });
        if (isDepartMentExist) {
            throw new AppError_1.default(500, 'Department Already Exist');
        }
        else {
            next();
        }
    });
});
// Middleware to check if the department exists before updating
academicDepartmentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentExist = yield AcademicDepartmentModel.findOne({ _id: query._id });
        if (!isDepartmentExist) {
            throw new AppError_1.default(404, "Department Doesn't Exist");
        }
        next();
    });
});
// Create the model using the schema
const AcademicDepartmentModel = (0, mongoose_1.model)('academicDepartment', academicDepartmentSchema);
exports.default = AcademicDepartmentModel;
