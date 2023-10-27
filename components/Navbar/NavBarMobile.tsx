"use client";

import { cn } from "@/lib/utils";
import NavbarItem from "./NavbarItem";
import { Menu } from "lucide-react";

interface NavBarMobileProps {
  className?: string;
  isMobile?: boolean;
  isMobileNavOpen?: boolean;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  links: {
    href: string;
    name: string;
  }[];
}

export default function NavBarMobile({
  className,
  isMobile,
  isMobileNavOpen,
  setIsMobileNavOpen,
  links,
}: NavBarMobileProps) {
  return (
    <nav
      className={cn(
        "w-[65%] max-w-[500px] h-full absolute z-50 top-0 left-0 flex items-center justify-center flex-col gap-4",
        className
      )}
    >
      {links.map((link) => (
        <NavbarItem {...link} key={link.name} className="w-full text-center" />
      ))}
    </nav>
  );
}
