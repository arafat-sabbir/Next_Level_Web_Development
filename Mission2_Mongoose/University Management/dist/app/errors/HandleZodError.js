"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
/**
 * Handles Zod validation errors and returns a simplified error object.
 *
 * @param {ZodError} err - The Zod error object.
 * @returns {Object} - The simplified error object containing status code, message, and error sources.
 */
const handleZodError = (err) => {
    const statusCode = 400;
    const errorSources = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return { statusCode, message: 'Validation Error', errorSources };
};
exports.handleZodError = handleZodError;
