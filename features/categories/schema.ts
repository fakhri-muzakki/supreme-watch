import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name minimal 2 karakter"),
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh lowercase, angka, dan dash"),
});

export type CategoryValues = z.infer<typeof categorySchema>;
