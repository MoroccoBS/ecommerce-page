"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import Slider from "../Slider";
import { AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import SliderBtn from "../SliderBtn";

interface ImagesProps {
  className?: string;
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

export default function Images({ className }: ImagesProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [slideOpen, setSlideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const swiper = useRef<SwiperRef>(null);

  const handleSwipeChange = () => {
    const position = swiper.current?.swiper?.activeIndex;
    setActiveImage(position || 0);
  };
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <div
        className={cn(
          className,
          "flex flex-col overflow-hidden md:gap-8 gap-4"
        )}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          initialSlide={activeImage}
          onSlideChange={handleSwipeChange}
          onChange={handleSwipeChange}
          className="md:rounded-xl rounded-none w-full md:h-[85%] h-full overflow-hidden"
          ref={swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image.src}
                width={600}
                height={600}
                alt="product"
                className="object-cover w-full h-full md:rounded-xl rounded-none cursor-pointer"
                onClick={() => {
                  setSlideOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
          {isMobile && (
            <SliderBtn
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              images={images}
              isMainPage={true}
            />
          )}
        </Swiper>
        <div className="w-[80%] h-max  m-auto justify-between relative gap-4 md:flex hidden">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.thumbnail}
              width={50}
              height={50}
              alt={image.alt}
              className={`rounded-md w-full object-cover hover:opacity-75 transition-all cursor-pointer ${
                activeImage === index ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                setActiveImage(index);
                swiper.current?.swiper?.slideTo(index);
              }}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {slideOpen && (
          <Slider activeImageIdx={activeImage} setSlideOpen={setSlideOpen} />
        )}
      </AnimatePresence>
    </>
  );
}
