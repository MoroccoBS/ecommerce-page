import { InferType, object, string } from "yup";

export const userSchema = object().shape({
  email: string().email().required(),
  password: string().required().min(8),
  name: string().required(),
});

export type User = InferType<typeof userSchema>;

export const loginSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export type Login = InferType<typeof loginSchema>;
