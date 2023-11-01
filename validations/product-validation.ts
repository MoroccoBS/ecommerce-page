import { InferType, number, object, string } from "yup";

export const productSchema = object().shape({
  name: string().email().required().min(3),
  description: string().required(),
  price: number().required(),
  category: string().required(),
});

export type User = InferType<typeof productSchema>;
