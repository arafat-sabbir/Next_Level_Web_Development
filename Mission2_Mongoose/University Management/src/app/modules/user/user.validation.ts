import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .max(20, { message: "Password Cha't Be More Than 20 Character Long" })
    .optional(),
});
export const userValidation = { userValidationSchema };
