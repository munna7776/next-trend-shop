"use client";

import React from "react"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Image as ImageType } from "@/libs/shopify/type"

const ProductImages = ({images}: {images: ImageType[]}) => {
  return (
    <>
        <div className="images-grid" >
        {
            images.map((image,index) => (
                <div key={index} className={`box-shadow rounded-lg w-full ${ index=== 0 ? "featured-image" : ""}`} >
                    <Image 
                        src={image.url}
                        alt={image.url}
                        width={image.width}
                        height={image.height}
                        className="h-full aspect-video rounded-lg"
                    />
                </div>
            ))
        }
        </div>
        <div className="block md:hidden" >
            <Swiper 
                modules={[Pagination, Autoplay]}
                pagination={{clickable:true}} 
                slidesPerView={1}
                autoplay={{delay: 2500}}
            >
                {
                    images.map((image,index) => {
                        return (
                            <SwiperSlide key={index} >
                                <Image 
                                    src={image.url}
                                    alt={image.url}
                                    width={image.width}
                                    height={300}
                                    className="w-full aspect-video"
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    </>
  )
}

export default ProductImages
