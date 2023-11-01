"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  error?: string;
  isError?: boolean;
  className?: string;
}

export default function Search({
  value,
  onChange,
  onFocus,
  error,
  isError,
  className,
}: SearchProps) {
  return (
    <div
      className={cn(
        className,
        "grid w-full max-w-[250px] items-center gap-1.5"
      )}
    >
      <div className="w-full flex justify-end">
        <h2 className="text-destructive font-bold ">{error}</h2>
      </div>
      <Input
        placeholder="Search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={`${isError ? "border-red-500" : ""}`}
        id="search"
      />
    </div>
  );
}
