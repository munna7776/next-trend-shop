import { getProductDetails } from '@/libs/shopify'
import React from 'react'
import Product from './Product'
import ProductImages from './ProductImages'
import ProductVariants from './ProductVariants'

const Page = async({params}: {params: {handle:string}}) => {
  const res = await getProductDetails(params.handle)
  return (
    <>
      <Product 
        product={res} 
        renderProductImages={<ProductImages images={res.images} />}
        renderProductVariants={<ProductVariants options={res.options} variants={res.variants} />}
      />
    </>
  )
}

export default Page
