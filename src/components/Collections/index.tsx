"use client";

import { PageInfo, ShopifyCollection } from '@/libs/shopify/type'
import React from 'react'

const Collections = ({collections,pageInfo}: {
    collections: ShopifyCollection[],
    pageInfo: PageInfo
}) => {
    console.log({collections,pageInfo})
  return (
    <div>
      
    </div>
  )
}

export default Collections
