import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div className={cn(className, "spinner")}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
