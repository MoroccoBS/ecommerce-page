"use client";
import Image from "next/image";
import PlaceHolder from "@/public/images/PlaceHolder.svg";
import { useRef, useState } from "react";
import ImageItem from "./ImageItem";
type FileState = File[];

export default function ImageUpload() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileState>([]);

  const handleDragEnter = (e: React.DragEvent<HTMLFormElement>) => {
    setDragActive(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setSelectedFiles((prevState: FileState) => [
          ...prevState,
          e.dataTransfer.files[i],
        ]);
      }
    }
    console.log(selectedFiles);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

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
      <form
        className={`w-full p-10 bg-white rounded-xl cursor-pointer outline-2 outline-dashed outline-ring/50 flex mt-10 ${
          dragActive ? "bg-primary/50 outline-ring" : "bg-white"
        } transition-all items-center justify-center`}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          // onChange={handleChange}
          accept="image/*"
          onChange={(e) => {
            const { files } = e.target;
            if (files) {
              for (let i = 0; i < files.length; i++) {
                setSelectedFiles((prevState: FileState) => [
                  ...prevState,
                  files[i],
                ]);
              }
            }
          }}
        />
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
      </form>
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
