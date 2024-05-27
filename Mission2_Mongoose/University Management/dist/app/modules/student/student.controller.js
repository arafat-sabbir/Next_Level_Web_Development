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
exports.deleteSingleStudent = exports.getSingleStudent = exports.getAllStudent = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, student_service_1.getAllStudentFromDb)();
        (0, sendResponse_1.default)(res, { message: 'Students Retrieved Successfully', data: result });
    }
    catch (error) {
        next(error);
    }
}));
exports.getAllStudent = getAllStudent;
const getSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, student_service_1.getSingleStudentFromDb)(id);
        (0, sendResponse_1.default)(res, { message: 'Student Retrieved Successfully', data: result });
    }
    catch (error) {
        next(error);
    }
}));
exports.getSingleStudent = getSingleStudent;
const deleteSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, student_service_1.deleteSingleStudentFromDb)(id);
        (0, sendResponse_1.default)(res, { message: 'Student Deleted Successfully', data: result });
    }
    catch (error) {
        next(error);
    }
}));
exports.deleteSingleStudent = deleteSingleStudent;
