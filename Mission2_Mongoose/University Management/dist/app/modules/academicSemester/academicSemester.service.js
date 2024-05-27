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
exports.AcademicSemesterServices = void 0;
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = __importDefault(require("./academicSemester.model"));
const createAcademicSemesterIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] != payload.code) {
        throw new Error(`Invalid Code For Name ${payload.name}`);
    }
    const result = yield academicSemester_model_1.default.create(payload);
    return result;
});
const getAllAcademicSemesterFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.default.find();
    return result;
});
const getSingleAcademicSemesterFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.default.findById({ _id: id });
    return result;
});
const updateSingleAcademicSemesterFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name) {
        if (academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] != payload.code) {
            throw new Error(`Invalid Code For Name ${payload.name}`);
        }
    }
    const result = yield academicSemester_model_1.default.findByIdAndUpdate({ id }, { payload }, { new: true });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDb,
    updateSingleAcademicSemesterFromDb,
    getSingleAcademicSemesterFromDb,
};
