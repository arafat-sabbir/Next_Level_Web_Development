"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({ invalid_type_error: 'Password must be a string' })
        .max(20, { message: "Password Cha't Be More Than 20 Character Long" })
        .optional(),
});
exports.userValidation = { userValidationSchema };
