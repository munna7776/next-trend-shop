import { getProductDetails, getProductRecommendations } from '@/libs/shopify'
import React, { Suspense } from 'react'
import Product from './Product'
import ProductImages from './ProductImages'
import ProductVariants from './ProductVariants'
import ProductRecommendations from './ProductRecommendations'

const Page = async({params}: {params: {handle:string}}) => {
  const res = await getProductDetails(params.handle)
  const products = await getProductRecommendations(res.id)
  return (
    <>
      <Product 
        product={res} 
        renderProductImages={<ProductImages images={res.images} />}
        renderProductVariants={<ProductVariants options={res.options} variants={res.variants} />}
      />
      <ProductRecommendations products={products} />
    </>
  )
}

export default Page
