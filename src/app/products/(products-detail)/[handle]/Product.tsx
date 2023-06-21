"use client";

import React from "react";
import {
  Image,
  PriceRange,
  SEO,
  ShopifyProductVariant,
} from "@/libs/shopify/type";
import { moneyFormatter } from "@/libs/utils";

type Product = {
  product: {
    title: string;
    description: string;
    handle: string;
    featuredImage: Image;
    id: string;
    images: Image[];
    isGiftCard: boolean;
    options: { name: string; values: string }[];
    priceRange: PriceRange;
    seo: SEO;
    tags: string[];
    totalInventory: number;
    variants: ShopifyProductVariant[];
  };
  renderProductImages: React.ReactNode;
};

const Product = ({ product, renderProductImages }: Product) => {
  const price = moneyFormatter(
    product.priceRange.minVariantPrice.currencyCode,
    product.priceRange.minVariantPrice.amount
  );
  return (
    <section className="flex flex-col md:flex-row gap-x-2.5 pb-5 md:pt-5 md:px-6">
      <div className="sticky z-[2] w-full md:w-1/2">{renderProductImages}</div>
      <div className="sticky z-[2] pt-5 px-6 w-full md:w-auto">
        <h1 className="text-xl text-[#212323] font-bold pb-3 border-b border-[#9e9eb3]">
          {product.title}
        </h1>
        <p className="mt-6 text-xl text-[#212323] font-semibold">{price}</p>
        <p className="text-[15px] text-[#4d4f4f] mb-6 ">
          Free Shipping, Return within 7 days
        </p>
      </div>
    </section>
  );
};

export default Product;
