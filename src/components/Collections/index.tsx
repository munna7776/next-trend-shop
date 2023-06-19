"use client";

import Link from "next/link";
import React from "react";
import { PageInfo, ShopifyCollection } from "@/libs/shopify/type";
import Image from "next/image";

const Collections = ({collections}:{
  collections: ShopifyCollection[];
  pageInfo: PageInfo;
}) => {

  return (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        {collections.map((collection, index) => {
          return (
            <li key={index} className="grid h-[350px] rounded-lg overflow-hidden">
              <Image
                src={collection.image.url}
                alt={collection.image.altText}
                height={350}
                width={collection.image.width}
                loading="lazy"
                className="row-start-1 row-end-2 col-start-1 col-end-2 rounded-lg aspect-video h-full object-cover object-center transition-transform origin-center duration-[8000ms] hover:scale-125"
              />
              <Link
                className="row-start-1 row-end-2 col-start-1 col-end-2 bg-white text-gray-900 rounded-xl px-10 py-1 text-lg self-end z-[19] mx-auto mb-[20px] shadow-[0px_3px_8px_rgba(0,0,0,0.24)]"
                href={`/collections/${collection.handle}`}
              >
                {collection.title}
              </Link>
            </li>
          );
        })}
      </ul>
  );
};

export default Collections;
