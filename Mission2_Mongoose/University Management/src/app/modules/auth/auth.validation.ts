import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string().email(),
    password: z.string().min(8),
  }),
});
export const AuthValidations = {
  loginValidationSchema,
};
