"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something Went Wrong';
    return res.status(statusCode).json({ success: false, message, error });
};
exports.default = globalErrorHandler;
