import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarItemProps {
  href: string;
  className?: string;
  name: React.ReactNode;
}

export default function NavbarItem({ href, className, name }: NavbarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "py-6 text-lg font-medium text-foreground/50 hover:text-foreground transition-all relative group before:absolute before:bottom-0 before:left-0 before:h-1 before:rounded-md before:bg-primary before:w-full before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 before:ease-in-out",
        className
      )}
    >
      {name}
    </Link>
  );
}
