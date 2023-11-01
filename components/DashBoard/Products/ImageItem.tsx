import { cn } from "@/lib/utils";
import Image from "next/image";
import { Trash } from "lucide-react";

interface ImageItemProps {
  src: string;
  className?: string;
  alt: string;
  onClick?: () => void;
  size?: number;
}

export default function ImageItem({
  className,
  src,
  alt,
  onClick,
  size = 175,
}: ImageItemProps) {
  return (
    <div
      className={cn("h-max cursor-pointer group relative", className)}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="transition-all hover:opacity-50 object-cover w-full h-full rounded-xl"
      />
      <Trash className="absolute top-1/2 right-1/2 group-hover:opacity-100 opacity-0 transition-all translate-x-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
    </div>
  );
}
