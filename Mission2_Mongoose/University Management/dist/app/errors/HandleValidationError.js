"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    console.log("from Validation error", err);
    const statusCode = 400;
    const errorSources = (err.errors && Object.values(err.errors).map((val) => ({
        path: val.path,
        message: val.message,
    }))) || [];
    return { statusCode, message: 'Validation Error', errorSources };
};
exports.default = handleValidationError;
