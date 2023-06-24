"use client";

import React from "react";
import { Product } from "@/libs/shopify/type";

type ProductProps = {
  product: Product
  renderProductImages: React.ReactNode;
  renderProductVariants: React.ReactNode;
};

const Product = ({
  product,
  renderProductImages,
  renderProductVariants,
}: ProductProps) => {
  return (
    <section className="flex flex-col md:flex-row gap-x-2.5 pb-5 md:pt-5 md:px-6">
      <div className="left md:w-1/2">
        <div className="sticky top-0 z-[2]">{renderProductImages}</div>
      </div>
      <div className="right md:w-1/2 md:pl-6">
        <div className="sticky top-0 z-[2] pt-5 px-6">
          <h1 className="text-xl text-[#212323] font-bold pb-3 border-b border-[#9e9eb3]">
            {product.title}
          </h1>
          {renderProductVariants}
          <p className="text-xl text-[#4d4f4f] w-full sm:w-3/4 md:w-full">
            {product.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
