import Image from "next/image";
import LogoImageWhite from "@/public/images/logo.svg";
import LogoImage from "@/public/images/logo-dark.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div>
      <Image
        src={LogoImageWhite}
        width={150}
        height={150}
        alt="logo"
        className={cn("dark:hidden block", className)}
      />
      <Image
        src={LogoImage}
        width={150}
        height={150}
        alt="logo"
        className={cn("hidden dark:block", className)}
      />
    </div>
  );
}
