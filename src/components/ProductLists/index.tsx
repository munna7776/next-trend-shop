import React from 'react'
import Image from 'next/image'
import { ShopifyCollectionProduct } from '@/libs/shopify/type'

const ProductLists = ({products}: {
    products: ShopifyCollectionProduct[]
}) => {
  return (
    <ul className="my-8 grid gap-6 justify-center product-grid "  >
      {
        products.map((product,index) => {
            return (
                <li key={index} className="min-w-[325px] xl:w-[325px] box-shadow rounded-xl" >
                    <div className="relative w-full h-[365px] overflow-hidden" >
                        <Image 
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText}
                            width={325}
                            height={400}
                            className="h-full w-full rounded-t-xl"
                        />
                    </div>
                    <div className="mt-3 p-2 text-center">
                        <h3 className="text-lg font-medium">{product.title}</h3>
                        <span className="text-lg">{`Rs. ${product.priceRange.minVariantPrice.amount}`}</span>
                    </div>
                </li>
            )
        })
      }
    </ul>
  )
}

export default ProductLists
