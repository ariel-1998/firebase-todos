import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Must be a valid Email."),
    password: z.string().min(8, "Password must contain 8 chars."),
    passwordConfirm: z.string(),
  })
  .refine(
    (args) => {
      return args.password === args.passwordConfirm;
    },
    { path: ["passwordConfirm"], message: "Passwords don't match." }
  );

export const profileUpdateSchema = z
  .object({
    email: z.string().email("Must be a valid Email."),
    password: z
      .string()
      .optional()
      .refine(
        (password) => {
          if (password) return password.length >= 8;
          return true;
        },
        { message: "Password must contain 8 chars." }
      ),

    passwordConfirm: z.string().optional(),
  })
  .refine(
    (args) => {
      return args.password === args.passwordConfirm;
    },
    { path: ["passwordConfirm"], message: "Passwords don't match." }
  );

export type TypeRegistraionData = z.infer<typeof registrationSchema>;
export type TypeProfileUpdate = z.infer<typeof profileUpdateSchema>;
