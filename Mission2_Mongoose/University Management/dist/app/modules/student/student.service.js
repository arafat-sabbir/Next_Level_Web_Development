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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleStudentFromDb = exports.deleteSingleStudentFromDb = exports.getSingleStudentFromDb = exports.getAllStudentFromDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
const student_utils_1 = require("./student.utils");
const getAllStudentFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    console.log(query);
    let searchTerm = ' ';
    if (query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchQuery = student_model_1.StudentModel.find({
        $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    const excludeField = ['searchTerm', 'sort', 'limit', 'page'];
    excludeField.forEach((field) => delete queryObj[field]);
    const filterQuery = searchQuery
        .find(queryObj)
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .lean();
    let sort = 'createdAt';
    if (query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 10;
    let skip = 0;
    if (query.page) {
        page = Number(query.page);
    }
    if (query.limit) {
        limit = Number(query.limit);
        skip = limit * (page - 1);
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = yield paginateQuery.limit(limit);
    return limitQuery;
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
const updateSingleStudentFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = (0, student_utils_1.updateStudentData)(remainingStudentData, name, guardian, localGuardian);
    const result = yield student_model_1.StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
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
