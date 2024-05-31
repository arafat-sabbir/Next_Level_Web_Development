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
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_service_1 = require("../academicSemester/academicSemester.service");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
/**
 * Creates a student on the database.
 * @param password The password for the student. If null, the default password is used.
 * @param payload The payload containing the student's data.
 * @returns The newly created student.
 * @throws {AppError} If the creation of the user or the student fails.
 */
const createStudentOnDb = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Prepare user data
    const userData = {};
    // Use the provided password, otherwise use the default password
    userData.password = password || config_1.default.default_password;
    // Set the role of the user to 'student'
    userData.role = 'student';
    // Find the academic semester
    const semester = yield academicSemester_service_1.AcademicSemesterServices.getSingleAcademicSemesterFromDb(String(payload.admissionSemester));
    // Generate the student ID
    userData.id = yield (0, user_utils_1.generateStudentId)(semester);
    const session = yield mongoose_1.default.startSession();
    try {
        // Create a user
        session.startTransaction();
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Failed To Create User');
        }
        // Set the user ID and user reference in the payload
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // Create the student
        const newStudent = yield student_model_1.StudentModel.create([payload], { session });
        if (!newStudent) {
            throw new AppError_1.default(400, 'Error Creating User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error.message);
    }
});
exports.userService = { createStudentOnDb };
