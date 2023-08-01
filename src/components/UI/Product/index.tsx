import Link from "next/link";
import Image from "next/image";
import React, { forwardRef } from "react";
import { ShopifyCollectionProduct } from "@/libs/shopify/type";
import { moneyFormatter } from "@/libs/utils";

type ProductProps = {
  product: ShopifyCollectionProduct;
  className?: string;
};

const Product = forwardRef<HTMLLIElement, ProductProps>(function Product(
  { product, className = "" },
  ref
) {
  return (
    <li ref={ref} className={`box-shadow rounded-xl ${className}`}>
      <Link href={`/products/${product.handle}`}>
        <div className="relative w-full rounded-t-xl h-[250px] sm:h-[325px] overflow-hidden image-container">
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              priority
              className="h-full w-full z-10 rounded-t-xl object-cover object-center transition-transform origin-center duration-[8000ms] hover:scale-125"
            />
        </div>
        <div className="mt-3 p-2 text-center">
          <h3 className="text-lg font-medium">{product.title}</h3>
          <span className="text-lg">
            {moneyFormatter(
              product.priceRange.minVariantPrice.currencyCode,
              product.priceRange.minVariantPrice.amount
            )}
          </span>
        </div>
      </Link>
    </li>
  );
});

export default Product;
