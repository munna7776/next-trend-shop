import { getAllProducts } from "@/libs/shopify";
import Link from "next/link";
import Image from "next/image";
import { ProductSkeleton } from "../skeleton-loader";
import { moneyFormatter } from "@/libs/utils";
import { getImage } from "@/libs/image";

export default async function FeaturedProducts() {
  const { products } = await getAllProducts({ first: 6 });
  const productsImagesWithPlaceholder = await Promise.all(
    products.map(async (product) => {
      const {
        base64,
        img: { src },
      } = await getImage(product.featuredImage.url);
      return { base64, src };
    })
  );
  return (
    <ul className="grid gap-4 mt-4 product-card-grid" >
      {products.map((product, index) => {
        return (
          <li key={product.id} className="">
            <Link href={`/products/${product.handle}`}>
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={productsImagesWithPlaceholder[index].src}
                  alt={product.title}
                  fill
                  placeholder="blur"
                  blurDataURL={productsImagesWithPlaceholder[index].base64}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="mt-3">
                <p className="font-medium">{product.title}</p>
                <span>
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
