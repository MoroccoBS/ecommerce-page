"use client";
import { cn } from "@/lib/utils";
import { ReactSVG } from "react-svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import useCart from "@/store/store";
import CartItem from "./CartItem";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";

interface CartProps {
  className?: string;
}

export default function Cart({ className }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  console.log(items);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none">
        <div className={cn(className, "relative")}>
          <ReactSVG
            src={"/images/icon-cart.svg"}
            width={40}
            height={40}
            className="transition-all cursor-pointer opacity-50 hover:opacity-100 aspect-square icon2"
          />
          <AnimatePresence mode="wait">
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 right-0 translate-x-1/3 -translate-y-2 bg-primary rounded-full px-2 text-white py-[7px] leading-[0] text-[0.75rem]"
              >
                {items.length}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] shadow-2xl mr-4 mt-4 h-max min-h-[250px] flex flex-col pb-6 max-h-[560px]">
        <DropdownMenuLabel className="text-xl font-bold px-4 py-4">
          Cart
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <h1
            key={"Title"}
            className="m-auto font-bold text-xl text-foreground/70 pb-6"
          >
            Your Cart is empty
          </h1>
        ) : (
          <div key={"Item"} className="w-full h-full overflow-y-scroll">
            <AnimatePresence mode="wait">
              {items.map((item) => (
                <CartItem {...item} quantity={item.quantity} key={item.id} />
              ))}
            </AnimatePresence>
            <Button className="mt-auto w-full">Checkout</Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
