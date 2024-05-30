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
exports.updateSingleStudentFromDb = exports.deleteSingleStudentFromDb = exports.getSingleStudentFromDb = exports.getAllStudentFromDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
const getAllStudentFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .lean();
    return result;
});
exports.getAllStudentFromDb = getAllStudentFromDb;
const getSingleStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.findOne({ id })
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .lean();
    return result;
});
exports.getSingleStudentFromDb = getSingleStudentFromDb;
const updateSingleStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.findOne({ id })
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .lean();
    return result;
});
exports.updateSingleStudentFromDb = updateSingleStudentFromDb;
const deleteSingleStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.StudentModel.updateOne({ id }, { isDeleted: true }, { session, new: true });
        if (!deletedStudent) {
            throw new Error('Error Deleting Student');
        }
        const deletedUser = yield user_model_1.UserModel.updateOne({ id }, { isDeleted: true }, { session, new: true });
        if (!deletedUser) {
            throw new Error('Error Deleting User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { deletedStudent, deletedUser };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Error Deleting User And Student');
    }
});
exports.deleteSingleStudentFromDb = deleteSingleStudentFromDb;
