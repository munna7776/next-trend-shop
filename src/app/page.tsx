import Link from "next/link";
import { Suspense } from "react";

import Carousel from "@/components/Carousel"
import Collections from "@/components/Collections";
import { CollectionSkeleton } from "@/components/skeleton-loader";
import { getCollections } from "@/libs/shopify";

export default async function Home() {
  const result = await getCollections({first:4});
  return (
    <main>
      <Carousel />
      <section className="w-[90%] md:w-4/5 mx-auto my-6">
      <div className="flex justify-between items-center gap-8 max-[400px]:flex-col max-[400px]:gap-4">
        <h3 className="font-bold text-xl">Shop by collections</h3>
        <Link href="/" className="border border-black p-3 bg-black text-white">
          View more
        </Link>
      </div>
      <Collections {...result} />
      </section>
    </main>
  )
}
