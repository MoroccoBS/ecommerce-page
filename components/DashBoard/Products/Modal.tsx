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
import { useUploadThing } from "@/lib/upload-thing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { Product } from "@prisma/client";

interface ModalProps {
  setProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProductState: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Modal({
  setProductModal,
  setProductState,
}: ModalProps) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: async (images) => {
        toast.success("Images uploaded successfully");
        toast.remove("loading");
        try {
          toast.loading("Adding product...", { id: "loadingProduct" });
          await axios
            .post("/api/addProduct", {
              ...values,
              images,
            })
            .then((res) => {
              setProductState((prev) => [...prev, res.data]);
              toast.remove("loadingProduct");
              toast.success("Product added successfully");
              setSelectedFiles([]);
              setValues({
                name: "",
                description: "",
                price: "",
              });
              setLoading(false);
              setTimeout(() => {
                setProductModal(false);
              }, 500);
            });
        } catch (err) {
          toast.remove("loading");
          toast.error("Something went wrong");
        }
      },
      onUploadError: () => {
        toast.remove("loading");
        toast.error("Something went wrong");
      },
      // onUploadBegin: () => {
      //   alert("upload has begun");
      // },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const handleForm = async () => {
    setLoading(true);
    try {
      const isValid = await productSchema.validate(values, {
        abortEarly: false,
      });
      if (!isValid) {
        return;
      }
      toast.loading("Uploading images...", { id: "loading" });
      await startUpload(selectedFiles);
    } catch (error: any) {
      setErrors(error.errors);
      setLoading(false);
    }
  };
  return (
    <DialogContent className="max-h-[80vh] overflow-y-scroll bg-background max-w-2xl w-full ">
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
      <ImageUpload
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        fileTypes={fileTypes}
      />
      <Button className="w-full" onClick={handleForm} disabled={loading}>
        {loading ? <Spinner /> : "Add Product"}
      </Button>
    </DialogContent>
  );
}
