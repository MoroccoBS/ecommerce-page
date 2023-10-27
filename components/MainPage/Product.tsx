import AddItem from "./AddItem";
import { cn } from "@/lib/utils";

interface Product {
  className?: string;
}

export default function Product({ className }: Product) {
  return (
    <div
      className={cn(
        className,
        "w-full h-full flex flex-col justify-center gap-4"
      )}
    >
      <h3 className="uppercase text-primary font-bold tracking-wider">
        Sneaker Company
      </h3>
      <h1 className="text-5xl font-bold">Fall Limited Edition Sneakers</h1>
      <p className="text-foreground/50 mt-4 tracking-wider">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
        mollitia sit quod corrupti veniam quae optio rem neque nulla amet
        suscipit similique voluptatibus sint, porro quos, saepe perspiciatis
        dignissimos nobis.
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-3xl ">$125.00</h1>
          <h1 className="bg-primary/25 text-primary py-1 px-2 rounded-lg font-bold">
            50%
          </h1>
        </div>
        <h1 className="font-bold text-xl line-through text-foreground/30">
          $250.00
        </h1>
      </div>
      <AddItem />
    </div>
  );
}
