"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Product from "@/components/UI/Product";
import { ShopifyCollectionProduct } from "@/libs/shopify/type";

const ProductRecommendations = ({products}: {products: ShopifyCollectionProduct[]}) => {
  
  return (
    <section>
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        autoplay={{delay: 2500}}
        className="px-6 pb-5 pt-1"
        spaceBetween={24}
      >
        {
            products.map((product) => {
                return (
                    <SwiperSlide key={product.id} className="basis-[254px] sm:basis-[325px]" >
                        <Product product={product} />
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </section>
  )
}

export default ProductRecommendations
