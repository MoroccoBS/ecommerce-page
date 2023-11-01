import Image from "next/image";
import Logo from "@/public/images/41.png";

interface ProfileProps {
  className?: string;
  image?: string | null;
  name?: string | null;
}
export default function Profile({ className, image, name }: ProfileProps) {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={image || Logo}
        width={50}
        height={50}
        alt="profile image"
        className="rounded-full h-full aspect-square"
      />
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Sneakers</h1>
        <h1>{name || ""} (Admin)</h1>
      </div>
    </div>
  );
}
