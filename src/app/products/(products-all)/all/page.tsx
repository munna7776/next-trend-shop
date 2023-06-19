import { getAllProducts } from '@/libs/shopify'
import Products from './products'

const Page = async() => {
  const result = await getAllProducts({first: 10})
  return (
    <section>
        <Products {...result} />
    </section>
  )
}

export default Page
