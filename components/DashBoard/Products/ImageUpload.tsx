"use client";
import Image from "next/image";
import PlaceHolder from "@/public/images/placeHolder.svg";
import { useCallback, useRef, useState } from "react";
import ImageItem from "./ImageItem";
interface ImageUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  fileTypes?: string[];
}
import { useDropzone } from "@uploadthing/react/hooks";
import type { FileWithPath } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

export default function ImageUpload({
  selectedFiles,
  setSelectedFiles,
  fileTypes,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setSelectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => {
      setDragActive(true);
    },
    onDragLeave: () => {
      setDragActive(false);
    },
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const openFileExplorer = () => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      inputElement.value = "";
      inputElement.click();
    }
  };

  const removeFile = (file: File, index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <div>
      <div
        className={`w-full p-10 bg-white rounded-xl cursor-pointer outline-2 outline-dashed outline-ring/50 flex mt-10 ${
          dragActive ? "bg-primary/50 outline-ring" : "bg-white"
        } transition-all items-center justify-center`}
        {...getRootProps()}
        onClick={openFileExplorer}
      >
        <input {...getInputProps()} ref={inputRef} />
        <Image
          src={PlaceHolder}
          alt="placeholder"
          width={175}
          height={175}
          className="m-auto"
        />
        <h1 className="text-center text-xl text-foreground/50">
          Drag and Drop or{" "}
          <span
            className="hover:text-primary hover:underline transition-all font-bold text-foreground duration-75"
            onClick={openFileExplorer}
          >
            Click to Upload
          </span>
        </h1>
      </div>
      <div className="max-h-20 overflow-x-auto flex w-full mt-6 items-center justify-center">
        {selectedFiles?.map((file: File, index: number) => (
          <ImageItem
            src={URL.createObjectURL(file)}
            key={file.name}
            alt={file.name}
            onClick={() => removeFile(file, index)}
            className="w-20 h-20"
          />
        ))}
      </div>
    </div>
  );
}
