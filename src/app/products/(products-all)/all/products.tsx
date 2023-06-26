"use client"

import React, { useEffect, useRef, useState } from 'react'
import {toast} from "react-toastify"
import ProductLists from '@/components/ProductLists'
import { ProductSkeleton } from '@/components/skeleton-loader'
import { PageInfo, ShopifyCollectionProduct } from '@/libs/shopify/type'
import { getAllProducts } from '@/libs/shopify'

const Products = ({products,pageInfo}: {
    products: ShopifyCollectionProduct[],
    pageInfo: PageInfo
}) => {

    const [productsState, setProductsState] = useState<ShopifyCollectionProduct[]>(products)
    const [pageInfoDetails, setPageInfoDetails] = useState<PageInfo>(pageInfo)
    const [loading, setLoding] = useState<boolean>(false)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if(!elementRef.current) {
        return;
      }
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/products/all?first=10&after=${pageInfoDetails.endCursor}`)
          const data = await res.json() as { products: ShopifyCollectionProduct[];pageInfo: PageInfo;}
          setProductsState(prev => [...prev, ...data.products])
          setPageInfoDetails(data.pageInfo)
        } catch (error) {
          console.error(error)
        }
      }
      const observer = new IntersectionObserver(async(entries) => {
        if(entries[0].isIntersecting && pageInfoDetails.hasNextPage) {
          console.log("infinte scroll")
          setLoding(true)
          await fetchData()
          setLoding(false)
        }
      })

      observer.observe(elementRef.current)

      return () => observer.disconnect()
    },[pageInfoDetails.endCursor, pageInfoDetails.hasNextPage])
  return (
    <>
      <ProductLists products={productsState} />
      {loading && pageInfoDetails.hasNextPage && (
        <ul
          className="animate-pulse mt-2 mb-6 grid gap-6 skeleton-grid"
        >
          {[...new Array(10)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </ul>
      )}
      <div ref={elementRef}  />
    </>
  )
}

export default Products
