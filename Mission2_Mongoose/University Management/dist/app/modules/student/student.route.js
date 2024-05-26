"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.get('/get-students', student_controller_1.getAllStudent);
router.get('/get-student/:id', student_controller_1.getSingleStudent);
router.delete('/delete-student/:id', student_controller_1.deleteSingleStudent);
exports.studentRoutes = router;
