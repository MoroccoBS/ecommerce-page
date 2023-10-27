"use client";
import { LucideTrash2 } from "lucide-react";
import Image from "next/image";
import useCart from "@/store/store";
import { motion } from "framer-motion";

interface CartItemProps {
  quantity?: number;
}

export default function CartItem({ quantity }: CartItemProps) {
  const price = quantity ? quantity * 125 : 0;
  const { remove } = useCart();

  const handleRemove = (id: number) => {
    remove(id);
  };

  return (
    <motion.div
      className="w-full flex items-center gap-4 px-4 py-2"
      exit={{ opacity: 0, scale: 0 }}
    >
      <Image
        src={"/images/image-product-1-thumbnail.jpg"}
        width={60}
        height={60}
        alt="product"
        className="rounded-md"
      />
      <div className="flex flex-col text-foreground/50 text-lg w-full">
        <h1>Fall Limited Edition Sneakers</h1>
        <div className="flex gap-1">
          <h1>$125.00 x {quantity ? quantity : 1} </h1>
          <h1 className="font-bold text-foreground">{price}</h1>
        </div>
      </div>
      <LucideTrash2
        className="w-8 aspect-square text-foreground/50 hover:text-destructive transition-all cursor-pointer"
        onClick={() => handleRemove(1)}
      />
    </motion.div>
  );
}
