import { z } from "zod";

// Register
export const RegisterSchema = z.object({
  full_name: z.string().min(2, "Full name minimal 2 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type RegisterData = z.infer<typeof RegisterSchema>;

// Login
export const LoginSchema = z.object({
  // full_name: z.string().min(2, "Full name minimal 2 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginData = z.infer<typeof LoginSchema>;
