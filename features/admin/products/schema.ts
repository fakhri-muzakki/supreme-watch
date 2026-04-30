import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Minimal 3 karakter"),
  price: z.coerce.number().min(1, "Harga minimal 1"),
  stock: z.coerce.number().min(0, "Stock tidak boleh negatif"),

  image: z
    .any()
    .optional()
    .refine((files) => {
      if (!files) return true;

      if (!(files instanceof FileList)) return false;
      if (files.length === 0) return false;

      const file = files[0];
      return file.type.startsWith("image/");
    }, "File harus berupa gambar")
    .refine((files) => {
      if (!files) return true;

      const file = files[0];
      return file.size <= 2 * 1024 * 1024;
    }, "Max size 2MB"),
});

export type ProductValues = {
  name: string;
  price: number;
  stock: number;
  image?: FileList;
};
