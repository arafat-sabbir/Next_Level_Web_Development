import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

/**
 * Handles Zod validation errors and returns a simplified error object.
 *
 * @param {ZodError} err - The Zod error object.
 * @returns {Object} - The simplified error object containing status code, message, and error sources.
 */
export const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return { statusCode, message: 'Validation Error', errorSources };
};

