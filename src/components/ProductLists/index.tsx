import { forwardRef } from "react";
import { ShopifyCollectionProduct } from "@/libs/shopify/type";
import Product from "../UI/Product";

const ProductLists = forwardRef<
  HTMLLIElement,
  { products: ShopifyCollectionProduct[] }
>(function ProductLists({ products }, ref) {
  return (
    <ul className="my-8 grid gap-4 product-card-grid">
      {products.map((product, index) => {
        return (
          <Product 
            key={product.id}
            ref={products.length === index + 1 ? ref : undefined}
            product={product}
          />
        );
      })}
    </ul>
  );
});

export default ProductLists;
