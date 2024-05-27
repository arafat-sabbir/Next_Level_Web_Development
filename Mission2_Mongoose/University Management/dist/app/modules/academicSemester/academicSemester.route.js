"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.createAcademicSemester);
router.get('/get-academic-semesters', academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemester);
router.get('/get-academic-semester/:semesterId', academicSemester_controller_1.AcademicSemesterControllers.getSingleAcademicSemester);
router.put('/update-academic-semester/:semesterId', academicSemester_controller_1.AcademicSemesterControllers.updateSingleAcademicSemester);
exports.academicSemesterRoutes = router;
