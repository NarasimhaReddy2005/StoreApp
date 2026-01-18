import { z } from "zod";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "A file must be uploaded",
  })
  .transform((file) => ({
    ...file,
    preview: URL.createObjectURL(file),
  }));

export const createProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z
    .string()
    .nonempty("Product description is required")
    .min(20, { message: "Description should be at least 20 characters long" }),
  price: z.coerce
    .number()
    .refine((val) => !isNaN(val), { message: "Price is required" })
    .min(100, "Price must be at least $1.00"),
  type: z.string().nonempty("Product type is required"),
  brand: z.string().nonempty("Product brand is required"),
  quantityInStock: z.coerce
    .number()
    .refine((val) => !isNaN(val), { message: "Quantity is required" })
    .min(0, "Quantity in stock cannot be negative"),
  pictureUrl: z.string().optional(), // to match with Product schema
  // optional cause before uploading, we cant have url
  file: fileSchema.optional(),// also we dont need this to be compulsory when we are editing
}).refine((data) => data.pictureUrl || data.file, {
  message: 'Please provide an image',
  path: ['file']
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
