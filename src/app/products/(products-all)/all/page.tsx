import { getAllProducts } from "@/libs/shopify"
import Products from "./products"

export const metadata = {
  title: "Next Trend Shop - Explore All Products for the Latest Trends and Must-Have Items",
  description: "Explore the Latest Trends in One Place - Discover an extensive collection of the hottest products at Next Trend Shop's All Products page. From fashion to tech, home decor to wellness essentials, find everything you need to stay ahead of the curve. Uncover the next big thing in style and innovation, all conveniently curated in a single destination. Elevate your shopping experience and embrace the future of trends today."
}

const Page = async() => {
  const result = await getAllProducts({first: 10})
  return (
    <section>
        <Products {...result} />
    </section>
  )
}

export default Page
