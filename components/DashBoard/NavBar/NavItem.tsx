import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  href?: string;
}
export default function NavItem({
  className,
  icon,
  label,
  href,
}: NavItemProps) {
  return (
    <Link
      href={href || "/dashboard"}
      className={cn(
        className,
        "flex gap-10 font-medium text-base text-foreground/80 hover:bg-secondary/50 transition-all px-3 py-4 rounded-xl"
      )}
    >
      <div>{icon}</div>
      <h1>{label}</h1>
    </Link>
  );
}
