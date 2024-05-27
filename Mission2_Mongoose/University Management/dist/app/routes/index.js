"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/students',
        route: student_route_1.studentRoutes,
    },
    {
        path: '/academic-semester',
        route: academicSemester_route_1.academicSemesterRoutes,
    },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
