import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Useranme must at least 3 characters long"),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(10, "Invlaid token"),
});
