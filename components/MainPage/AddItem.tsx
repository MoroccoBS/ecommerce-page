"use client";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import Button from "../Button";
import useCart from "@/store/store";
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";

export default function AddItem() {
  const { items, add, decrease, increase } = useCart();
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (items.find((item) => item.id === 1)) {
      toast.error("This item is already in your cart");
      console.log("This item is already in your cart");
      return;
    }
    if (quantity > 1) {
      add(1, quantity);
      setQuantity(0);
    } else {
      // toast.custom((t) => (
      //   <div>
      //     <IoWarningOutline className="text-2xl" />
      //     <h1>Quantity must be greater than 0</h1>
      //   </div>
      // ));
      toast("Quantity must be greater than 0", {
        icon: <IoWarningOutline className="text-2xl" />,
        duration: 1000,
      });
    }
  };

  return (
    <div className="w-full flex gap-4">
      <div className="w-1/2 flex justify-between items-center max-w-[150px]">
        <button className="" onClick={() => handleDecrease()}>
          <ReactSVG
            src={"/images/icon-minus.svg"}
            width={20}
            height={20}
            className="fill-white"
          />
        </button>
        <h1 className="font-bold text-lg">{quantity}</h1>
        <button onClick={() => handleIncrease()}>
          <ReactSVG
            src={"/images/icon-plus.svg"}
            width={20}
            height={20}
            className="fill-white"
          />
        </button>
      </div>
      <Button
        className="w-full shadow-2xl flex gap-4"
        onClick={() => handleAddToCart()}
      >
        <ReactSVG
          src={"/images/icon-cart.svg"}
          width={20}
          height={20}
          className="stroke-white icon"
        />
        <h1>Add to Cart</h1>
      </Button>
    </div>
  );
}
