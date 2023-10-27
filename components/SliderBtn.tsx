"use client";

import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useSwiper } from "swiper/react";
import Image from "next/image";

interface SliderBtnProps {
  className?: string;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  images: {
    src: string;
    thumbnail: string;
    alt: string;
  }[];
  isMainPage?: boolean;
}

export default function SliderBtn({
  className,
  activeImage,
  setActiveImage,
  images,
  isMainPage,
}: SliderBtnProps) {
  const swiper = useSwiper();
  const handleSwipeNext = () => {
    const position = swiper.activeIndex;
    swiper.slideNext();
    setActiveImage(position === 3 ? position : position + 1);
    // if (position === 0) {
    //   setActiveImage(position + 1);
    // } else {
    //   setActiveImage(position);
    // }
    // if (position === 3) {
    //   swiper.slideTo(0);
    // }
    // if (position === 0) {
    //   swiper.slideTo(3);
    // // }
    // setActiveImage(position);
    console.log(position);
  };
  const handleSwipePrev = () => {
    const position = swiper.activeIndex;
    swiper.slidePrev();
    setActiveImage(position === 0 ? position : position - 1);
    console.log(position);
  };

  return (
    <>
      <motion.button
        initial={{ y: "-100%", x: "25%" }}
        whileHover={{ scale: 1.1, y: "-100%", x: "25%" }}
        whileTap={{ scale: 0.9, y: "-100%", x: "25%" }}
        onClick={() => handleSwipePrev()}
        className="absolute w-10 top-1/2 left-0 z-50 aspect-square bg-background rounded-full p-2"
      >
        <IoIosArrowBack className="w-full h-full text-foreground hover:text-primary transition-all -translate-x-[2px]" />
      </motion.button>
      <motion.button
        initial={{ y: "-100%", x: "-25%" }}
        whileHover={{ scale: 1.1, y: "-100%", x: "-25%" }}
        whileTap={{ scale: 0.9, y: "-100%", x: "-25%" }}
        onClick={() => handleSwipeNext()}
        className="absolute w-10 top-1/2 right-0 z-50 aspect-square bg-background rounded-full p-2"
      >
        <IoIosArrowBack className="w-full h-full text-foreground hover:text-primary transition-all rotate-180 translate-x-[2px]" />
      </motion.button>
      {!isMainPage && (
        <div className="w-[80%] h-max flex justify-between sm:gap-8 gap-2 absolute bottom-0 left-1/2 -translate-x-1/2 z-[100]">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.thumbnail}
              width={50}
              height={50}
              alt={image.alt}
              className={`rounded-md w-full aspect-square object-cover hover:opacity-75 transition-all cursor-pointer ${
                activeImage === index ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                setActiveImage(index);
                swiper.slideTo(index);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
