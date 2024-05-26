"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const user_route_1 = require("./app/modules/user/user.route");
// routes
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// use routes
app.use('/api/v1/students', student_route_1.studentRoutes);
app.use('/api/v1/users', user_route_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Hello NewBie!');
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({ message: false, error });
    }
});
app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});
exports.default = app;
