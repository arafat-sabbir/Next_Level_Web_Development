"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const HandleValidationError_1 = __importDefault(require("../errors/HandleValidationError"));
const HandleZodError_1 = __importDefault(require("../errors/HandleZodError"));
const HandleCastError_1 = __importDefault(require("./HandleCastError"));
const HandleDuplicateError_1 = __importDefault(require("../errors/HandleDuplicateError"));
/**
 * Global error handler for Express.js applications.
 * Handles errors that occur during the request-response cycle.
 *
 * @param {Error} error - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Response} The JSON response containing the error message and status code.
 */
const globalErrorHandler = (error, req, res, next) => {
    // Retrieve the status code from the error object, or default to 500.
    let statusCode = error.statusCode || 500;
    let stack = null;
    // Retrieve the error message from the error object, or default to 'Something Went Wrong'.
    let message = error.message || 'Something Went Wrong';
    let errorSources = [
        {
            path: ' ',
            message: 'Something Went Wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, HandleZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        stack = config_1.default.NODE_ENV === 'development' && error.stack;
    }
    else if (error.name === 'ValidationError') {
        const simplifiedError = (0, HandleValidationError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        stack = config_1.default.NODE_ENV === 'development' && error.stack;
    }
    else if (error.name === 'CastError') {
        const simplifiedError = (0, HandleCastError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        stack = config_1.default.NODE_ENV === 'development' && error.stack;
    }
    else if (error.code === 11000) {
        const simplifiedError = (0, HandleDuplicateError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        stack = config_1.default.NODE_ENV === 'development' && error.stack;
    }
    // Return a JSON response with the error message and status code.
    return res.status(statusCode).json(Object.assign({ statusCode, success: false, message,
        errorSources }, (stack && { stack })));
};
exports.default = globalErrorHandler;
