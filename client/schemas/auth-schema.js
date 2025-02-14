import * as z from "zod";

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(usernameRegex, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, { message: "Password is too long." })
    .regex(passwordValidation, {
      message:
        "Password must have at least 6 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
    }),
});

export const signupSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(3, { message: "First name must be at least 3 characters." })
      .max(50, { message: "First name is too long." }),

    lastname: z
      .string()
      .trim()
      .min(3, { message: "Last name must be at least 3 characters." })
      .max(50, { message: "Last name is too long." }),

    username: z
      .string()
      .trim()
      .min(5, { message: "Username must be at least 5 characters." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(usernameRegex, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(50, { message: "Password is too long." })
      .regex(passwordValidation, {
        message:
          "Password must have at least 6 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
      }),

    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and conform is not matched with each other.",
  });
