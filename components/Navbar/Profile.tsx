import Image from "next/image";
import ProfileImage from "@/public/images/image-avatar.png";
import { cn } from "@/lib/utils";
interface ProfileProps {
  className?: string;
  width?: number;
}

export default function Profile({ className, width = 40 }: ProfileProps) {
  return (
    <div
      className={cn(
        className,
        "outline-none hover:outline hover:outline-2 hover:outline-primary transition-all cursor-pointer rounded-full"
      )}
    >
      <Image src={ProfileImage} width={width} height={width} alt="profile" />
    </div>
  );
}
