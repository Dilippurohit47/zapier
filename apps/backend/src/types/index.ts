import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .nonempty({ message: "name is required" }),
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty({ message: "password is required" }),
});
export const signinSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty({ message: "password is required" }),
});

export const zapCreateSchema = z.object({
  availableTriggerId: z
    .string()
    .nonempty({ message: "Create at least one trigger" }),
  triggerMetadata: z.any().optional(),
  actions: z
    .array(
      z.object({
        availableActionId: z
          .string()
          .nonempty({ message: "create at least one action" }),
        actionMetadata: z.any().optional(),
      })
    )
    .nonempty({ message: "Create at least one event " }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password should be 8 characters long" })
      .nonempty("Please enter password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });
