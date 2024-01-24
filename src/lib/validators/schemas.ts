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

export const UserInformationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters long",
    })
    .max(20, {
      message: "Full name must be at most 20 characters long",
    }),
  phone: z
    .string()
    .min(7, {
      message: "Phone number must be at least 7 characters long",
    })
    .max(14, {
      message: "Phone number must be at most 12 characters long",
    }),
  user_role: z.string().refine((value) => {
    if (value !== "buyer" && value !== "seller") {
      return false
    } else {
      return true
    }
  }),
})

export const CourseSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50, {
      message: "Title must be at most 50 characters long",
    }),
  price: z.string().refine((value) => Number(value)),
  preview: z.string(),
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters long",
    })
    .max(30, {
      message: "Category must be at most 30 characters long",
    }),
  description: z
    .string()
    .max(300, {
      message: "Description must be at most 300 characters long",
    })
    .refine((value) => {
      if (value.length === 0) {
        return false
      } else {
        return true
      }
    }),
  video_url: z.string(),
})
