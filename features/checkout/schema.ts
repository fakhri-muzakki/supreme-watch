import { z } from "zod";

export const checkoutSchema = z.object({
  customer_name: z.string().min(3, "Name is required"),
  customer_email: z.string().email("Invalid email"),
  customer_phone: z.string().min(8, "Invalid phone"),
  shipping_address: z.string().min(10, "Address too short"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
