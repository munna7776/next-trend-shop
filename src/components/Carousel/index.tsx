"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNextSlide = () => {
    if (activeIndex < 2) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  return (
    <section className="relative overflow-hidden h-[300px] sm:h-[400px]">
      <button
        onClick={handleNextSlide}
        className={`absolute right-5 top-2/4 -translate-y-2/4 z-10 ${ activeIndex === 2 ? "hidden" : "" }`}
      >
        <svg width="7" height="14" className="text-white" aria-hidden="true">
          <path
            d="M0 0L7 7L0 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <button
        onClick={handlePrevSlide}
        className={`absolute left-5 top-2/4 -translate-y-2/4 z-10 ${ activeIndex === 0 ? "hidden" : "" }`}
      >
        <svg
          width="7"
          height="14"
          className="text-white rotate-180"
          aria-hidden="true"
        >
          <path
            d="M0 0L7 7L0 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <div className="flex h-full transition-transform duration-[350ms]" style={{transform: `translateX(-${activeIndex*100}%)`}} >
        <div className="basis-full grow-0 shrink-0 relative overlay-shadow">
          <Image
            src="/images/trend-1-image.jpg"
            alt="trend-image"
            width={1920}
            height={400}
            loading="lazy"
            className="h-full block md:hidden"
          />
          <Image
            src="/images/trend-4-image.jpg"
            alt="trend-image"
            width={1920}
            height={400}
            loading="lazy"
            className="h-full hidden md:block"
          />
          <div className="absolute z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-y-[10px] items-center text-white">
            <h2 className="text-5xl text-center" >Industrial design meets fashion.</h2>
            <p>A typical goods</p>
            <Link href="/" className="border border-white p-3" >Show now</Link>
          </div>
        </div>
        <div className="basis-full grow-0 shrink-0 relative overlay-shadow">
          <Image
            src="/images/trend_2_image.jpg"
            alt="trend-image"
            width={1920}
            height={400}
            loading="lazy"
            className="h-full"
          />
        </div>
        <div className="basis-full grow-0 shrink-0 relative overlay-shadow">
          <Image
            src="/images/trend_3_image.jpg"
            alt="trend-image"
            width={1920}
            height={500}
            loading="lazy"
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
