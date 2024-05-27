"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_zod_validation_1 = require("../student/student.zod.validation");
const validateRequest_1 = __importDefault(require("src/app/middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_zod_validation_1.createStudentZodValidationSchema), user_controller_1.userControllers.createNewStudent);
exports.userRoutes = router;
