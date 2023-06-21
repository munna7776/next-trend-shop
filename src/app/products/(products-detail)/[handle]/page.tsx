import { getProductDetails } from '@/libs/shopify'
import React from 'react'
import Product from './Product'
import ProductImages from './ProductImages'

const Page = async({params}: {params: {handle:string}}) => {
  const res = await getProductDetails(params.handle)
  return (
    <>
      <Product 
        product={res} 
        renderProductImages={<ProductImages images={res.images} />}
      />
    </>
  )
}

export default Page
