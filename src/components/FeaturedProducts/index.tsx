import { getAllProducts } from "@/libs/shopify";
import Link from "next/link";
import Image from "next/image";
import { ProductSkeleton } from "../skeleton-loader";
import { moneyFormatter } from "@/libs/utils";

export default async function FeaturedProducts() {
  const { products } = await getAllProducts({ first: 6 });
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {products.map((product, index) => {
        return (
          <li key={product.id} className={`box-shadow rounded-xl w-auto`}>
            <Link href={`/products/${product.handle}`}>
              <div className="relative w-full rounded-t-xl h-[250px] sm:h-[325px] overflow-hidden">
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                  className="h-full w-full rounded-t-xl object-cover object-center transition-transform origin-center duration-[2000ms] hover:scale-110"
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
      })}
    </ul>
  );
}

export const FeaturedProductsSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {[...new Array(6)].map((_, index) => (
        <ProductSkeleton key={index} className="w-auto" />
      ))}
    </ul>
  );
};
