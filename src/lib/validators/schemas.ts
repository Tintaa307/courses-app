import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must be at most 50 characters long",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9\s]/, {
      message: "Password must contain at least one symbol",
    }),
})
