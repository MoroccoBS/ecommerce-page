import Image from "next/image";
import LogoImageWhite from "@/public/images/logo.svg";
import LogoImage from "@/public/images/logo-dark.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 150 }: LogoProps) {
  return (
    <div className={cn(className, "relative w-40 h-full")}>
      <Image
        src={LogoImageWhite}
        width={size}
        height={size}
        alt="logo"
        className={cn(
          "dark:hidden block absolute w-full top-1/2 -translate-y-1/2"
        )}
      />
      <Image
        src={LogoImage}
        width={size}
        height={size}
        alt="logo"
        className={cn(
          "hidden dark:block absolute w-full top-1/2 -translate-y-1/2"
        )}
      />
    </div>
  );
}
