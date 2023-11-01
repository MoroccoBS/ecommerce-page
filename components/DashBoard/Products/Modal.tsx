"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ImageUpload from "./ImageUpload";
import Input from "@/components/SingIn/Input";
import { productSchema } from "@/validations/product-validation";
import { useState } from "react";

export default function Modal() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleForm = async () => {
    setLoading(true);
    try {
      const isValid = await productSchema.validate(values, {
        abortEarly: false,
      });
      if (!isValid) {
        setErrors(isValid);
        return;
      }
    } catch (error: any) {
      setErrors(error.errors);
      setLoading(false);
    }
  };
  return (
    <DialogContent className="max-h-[80vh] overflow-y-scroll bg-white max-w-2xl w-full">
      <DialogHeader>
        <DialogTitle className="text-center text-3xl mb-6">
          Add a Product
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Input
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          placeholder="Product Name"
          label="Name"
          type="text"
          loading={loading}
          error={errors.name}
          isError={errors.name !== ""}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
        <Input
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          placeholder="Product description"
          label="Description"
          type="text"
          loading={loading}
          error={errors.description}
          isError={errors.description !== ""}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, description: "" }));
          }}
        />
        <Input
          value={values.price}
          onChange={(e) => setValues({ ...values, price: e.target.value })}
          placeholder="Product price"
          label="Price"
          type="text"
          loading={loading}
          error={errors.price}
          isError={errors.price !== ""}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, price: "" }));
          }}
        />
      </div>
      <ImageUpload />
    </DialogContent>
  );
}
