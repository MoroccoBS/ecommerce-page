"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SliderBtn from "./SliderBtn";
import { AiOutlineClose } from "react-icons/ai";

interface SliderProps {
  className?: string;
  activeImageIdx: number;
  setSlideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const images = [
  {
    src: "/images/image-product-1.jpg",
    thumbnail: "/images/image-product-1-thumbnail.jpg",
    alt: "product",
  },
  {
    src: "/images/image-product-2.jpg",
    thumbnail: "/images/image-product-2-thumbnail.jpg",
    alt: "product",
  },
  {
    src: "/images/image-product-3.jpg",
    thumbnail: "/images/image-product-3-thumbnail.jpg",
    alt: "product",
  },
  {
    src: "/images/image-product-4.jpg",
    thumbnail: "/images/image-product-4-thumbnail.jpg",
    alt: "product",
  },
];

export default function Slider({
  className,
  activeImageIdx,
  setSlideOpen,
}: SliderProps) {
  const [activeImage, setActiveImage] = useState(activeImageIdx);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
        type: "tween",
        // type: "spring",
        // stiffness: 125,
        // damping: 10,
        // mass: 1,
      }}
      className={cn(
        className,
        "w-full h-full bg-black/50 absolute z-50 top-0 left-0 flex items-center justify-center flex-col gap-4"
      )}
    >
      <div
        className="w-full max-w-[500px] h-full max-h-[600px] relative rounded-xl
		"
      >
        <button
          className="absolute -top-8 right-0 z-50"
          onClick={() => setSlideOpen(false)}
        >
          <AiOutlineClose className="w-full h-full text-2xl text-primary/40 hover:text-primary transition-all" />
        </button>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          className="w-[full] h-full rounded-xl flex flex-col"
          initialSlide={activeImage}
          onSlideChange={(swiper) => {
            const position = swiper.activeIndex;
            setActiveImage(position);
          }}
          // breakpoints={{
          //   640: {
          //     slidesPerView: 2,
          //     spaceBetween: 20,
          //   },
          //   768: {
          //     slidesPerView: 4,
          //     spaceBetween: 40,
          //   },
          //   1024: {
          //     slidesPerView: 4,
          //     spaceBetween: 50,
          //   },
          // }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image.src}
                width={600}
                height={600}
                alt={image.alt}
                className="object-cover w-[90%] h-[83%] m-auto rounded-xl"
              />
            </SwiperSlide>
          ))}
          <SliderBtn
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            images={images}
          />
        </Swiper>
      </div>
    </motion.div>
  );
}
