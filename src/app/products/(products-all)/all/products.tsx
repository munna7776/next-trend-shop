"use client"

import ProductLists from '@/components/ProductLists'
import { PageInfo, ShopifyCollectionProduct } from '@/libs/shopify/type'
import React, { useState } from 'react'

const Products = ({products,pageInfo}: {
    products: ShopifyCollectionProduct[],
    pageInfo: PageInfo
}) => {

    const [productsState, setProductsState] = useState<ShopifyCollectionProduct[]>(products)
    console.log(productsState)
  return (
    <>
      <ProductLists products={productsState} />
    </>
  )
}

export default Products
