"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return { success: false, statusCode, message: 'Validation Error', errorSources };
};
exports.default = handleZodError;
