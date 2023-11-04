import { InferType, number, object, string } from "yup";

export const productSchema = object().shape({
  name: string().required().min(3),
  description: string().required(),
  price: string().required(),
});

export type User = InferType<typeof productSchema>;
