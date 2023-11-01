import Image from "next/image";
import PlaceHolder from "@/public/images/placeholder.svg";
export default function ImageUpload() {
  return (
    <div className="w-full flex p-10 bg-white rounded-xl cursor-pointer">
      <Image
        src={PlaceHolder}
        alt="placeholder"
        width={175}
        height={175}
        className="m-auto"
      />
    </div>
  );
}
