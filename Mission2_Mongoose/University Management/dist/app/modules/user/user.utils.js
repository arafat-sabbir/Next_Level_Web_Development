"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudentId = void 0;
const generateStudentId = (payload) => {
    const currentId = (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
};
exports.generateStudentId = generateStudentId;
