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
exports.AcademicFacultyServices = void 0;
const academicFaculty_model_1 = __importDefault(require("./academicFaculty.model"));
const createAcademicFacultyIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.create(payload);
    return result;
});
const getAllAcademicFacultyFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.find();
    return result;
});
const getSingleAcademicFacultyFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.findOne({ _id: id });
    return result;
});
const updateSingleAcademicFacultyFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
exports.AcademicFacultyServices = {
    getAllAcademicFacultyFromDb,
    getSingleAcademicFacultyFromDb,
    createAcademicFacultyIntoDb,
    updateSingleAcademicFacultyFromDb,
};
