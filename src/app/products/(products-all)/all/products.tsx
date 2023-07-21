"use client"

import ProductLists from "@/components/ProductLists"
import { ProductSkeleton } from "@/components/skeleton-loader"
import { PageInfo, ShopifyCollectionProduct } from "@/libs/shopify/type"
import { useProducts } from "./useProducts"

const Products = ({products,pageInfo}: {
    products: ShopifyCollectionProduct[],
    pageInfo: PageInfo
}) => {

  const {
    productLists,
    loading,
    pageInfoDetail,
    ref: elementRef
  } = useProducts(products,pageInfo)    

  return (
    <>
      <ProductLists ref={elementRef} products={productLists} />
      {loading && pageInfoDetail.hasNextPage && (
        <ul
          className="mt-2 mb-6 grid gap-6 skeleton-grid"
        >
          {[...new Array(10)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Products
