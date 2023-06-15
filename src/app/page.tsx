import Carousel from "@/components/Carousel"
import Collections from "@/components/Collections";
import { getCollections } from "@/libs/shopify"

export default async function Home() {

  const result = await getCollections({first:4});
  // const result = {
  //   collections: [],
  //   pageInfo: {
  //     startCursor: '',
  //     endCursor: '',
  //     hasNextPage: false,
  //     hasPreviousPage: false
  //   }
  // }
  return (
    <main>
      <Carousel />
      <Collections {...result} />
    </main>
  )
}
