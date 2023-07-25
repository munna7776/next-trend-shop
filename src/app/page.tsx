import Link from "next/link";
import { Suspense } from "react";

import Carousel from "@/components/Carousel"
import Collections from "@/components/Collections";
import { CollectionSkeleton } from "@/components/skeleton-loader";
import FeaturedProducts, { FeaturedProductsSkeleton } from "@/components/FeaturedProducts";

export default async function Home() {
  return (
    <main>
      <Carousel />
      <section className="w-[90%] md:w-4/5 mx-auto my-6">
        <div className="flex justify-between items-center gap-8 max-[400px]:flex-col max-[400px]:gap-4">
          <h3 className="font-bold text-xl">Featured Products</h3>
          <Link href="/products/all" className="border border-black p-3 bg-black text-white">
            View more
          </Link>
        </div>
        <Suspense fallback={<FeaturedProductsSkeleton />} >
          <FeaturedProducts />
        </Suspense>
      </section>
      <section className="w-[90%] md:w-4/5 mx-auto my-6">
        <div className="flex justify-between items-center gap-8 max-[400px]:flex-col max-[400px]:gap-4">
          <h3 className="font-bold text-xl">Shop by collections</h3>
          <Link href="/collections/all" className="border border-black p-3 bg-black text-white">
            View more
          </Link>
        </div>
        <Suspense fallback={<CollectionSkeleton noOfSkeleton={4} />} >
          <Collections />
        </Suspense>
      </section>
    </main>
  )
}
