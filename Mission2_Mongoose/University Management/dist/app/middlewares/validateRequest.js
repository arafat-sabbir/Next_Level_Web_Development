"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Middleware to validate incoming request body using Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema used for validation.
 * @returns {Function} - The middleware function.
 */
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Parse the request body using the provided schema.
            yield schema.parseAsync({ body: req.body });
            // Continue to the next middleware.
            next();
        }
        catch (error) {
            // Pass the error to the next middleware if validation fails.
            next(error);
        }
    });
};
exports.default = validateRequest;
