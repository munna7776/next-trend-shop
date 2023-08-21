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
    <li ref={ref} className={className}>
      <Link href={`/products/${product.handle}`}>
        <div className="relative w-full aspect-square overflow-hidden image-container">
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              priority
              className="w-full z-10 object-cover object-center"
            />
        </div>
        <div className="mt-3">
          <h3 className="font-medium">{product.title}</h3>
          <span>
            {`MRP : ${moneyFormatter(
              product.priceRange.minVariantPrice.currencyCode,
              product.priceRange.minVariantPrice.amount
            )}`}
          </span>
        </div>
      </Link>
    </li>
  );
});

export default Product;
