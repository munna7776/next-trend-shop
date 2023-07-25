import { getAllProducts } from "@/libs/shopify";
import Product from "../UI/Product";
import { ProductSkeleton } from "../skeleton-loader";

export default async function FeaturedProducts() {
  const { products } = await getAllProducts({ first: 6 });
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} className="w-auto" />
        );
      })}
    </ul>
  );
};

export const FeaturedProductsSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {[...new Array(10)].map((_, index) => (
        <ProductSkeleton key={index} className="w-auto" />
      ))}
    </ul>
  );
};
