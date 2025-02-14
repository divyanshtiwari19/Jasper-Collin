import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Price must be a valid number" })
    .transform((val) => Number(val)),
  category: z.string().trim().min(1, { message: "Category is required" }),
});
