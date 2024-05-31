"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => { next(err), console.log({ err }, "from Cathc Async"); });
    };
};
exports.default = catchAsync;
