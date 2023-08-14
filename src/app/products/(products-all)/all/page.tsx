import { getAllProducts } from "@/libs/shopify"
import Products from "./products"

export const runtime = "edge"

const Page = async() => {
  const result = await getAllProducts({first: 10})
  return (
    <section>
        <Products {...result} />
    </section>
  )
}

export default Page
