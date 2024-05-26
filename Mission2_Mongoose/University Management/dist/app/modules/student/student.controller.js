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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleStudent = exports.getSingleStudent = exports.getAllStudent = void 0;
const student_service_1 = require("./student.service");
const getAllStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, student_service_1.getAllStudentFromDb)();
        res.status(200).json({
            success: true,
            message: 'Students Retrieved Successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllStudent = getAllStudent;
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, student_service_1.getSingleStudentFromDb)(id);
        res.status(200).json({
            success: true,
            message: 'Student Retrieved Successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleStudent = getSingleStudent;
const deleteSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, student_service_1.deleteSingleStudentFromDb)(id);
        res.status(200).json({
            success: true,
            message: 'Student Deleted Successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSingleStudent = deleteSingleStudent;
