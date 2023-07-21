import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/libs/nextauth-provider-options"
import { getCustomerOrder } from "@/libs/shopify"
import Link from "next/link"
import Image from "next/image"
import { moneyFormatter } from "@/libs/utils"


const Page = async({params, searchParams}: {
    params: {
        id: string
    },
    searchParams: { key: string }
}) => {
  if(!params.id) {
    return redirect("/account")
  }
  if(!searchParams.key) {
    return notFound()
  }
  const session = await getServerSession(authOptions)
  if(!session) {
    return redirect("/login")
  }
  const orderId = `gid://shopify/Order/${params.id}?key=${searchParams.key}`
  const order = await getCustomerOrder(orderId)

  return (
    <main className="px-6 py-6 md:px-8 md:py-8 lg:px-12" >
      <div className="flex items-center justify-between gap-y-2 gap-x-6 flex-wrap" >
        <h1 className="text-[32px] font-bold" >Order Detail</h1>
        <Link href="/account" className="text-[#3c3c3c] underline" >Return to Account Details</Link>
      </div>
      <section className="mt-6 md:mt-8" >
          <h3 className="text-xl font-medium text-[#3c3c3c]" >Order No. {order.name}</h3>
          <p className="mt-2 text-[#3c3c3c]" >Placed on {new Date(order.processedAt).toDateString()}</p>
          <div className="flex flex-wrap gap-4 mt-5 text-[#3c3c3c]">
            <table className="w-full lg:w-[70%] divide-y divide-gray-300" >
              <thead>
                <tr className="align-baseline" >
                  <th scope="col" className="font-semibold pb-4 text-start" >Product</th>
                  <th scope="col" className="font-semibold pb-4 text-end hidden md:table-cell" >Price</th>
                  <th scope="col" className="font-semibold pb-4 text-end hidden sm:table-cell " >Quantity</th>
                  <th scope="col" className="font-semibold pb-4 text-end" >Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200" >
                {
                  order.lineItems.map((lineItem) => {
                    return (
                      <tr key={lineItem.variant.id} >
                        <td className="py-4 pr-3">
                          <div className="flex items-center gap-6" >
                            <Link href={`/products/${lineItem.variant.product.handle}`} >
                              <div className="w-24 sm:w-40 relative aspect-square rounded-md border border-gray-300" >
                                  <Image 
                                    src={lineItem.variant.image ? lineItem.variant.image.url : lineItem.variant.product.featuredImage.url}
                                    alt={lineItem.title}
                                    fill
                                    className="rounded-md object-cover"
                                  />
                              </div>
                            </Link>
                            <div>
                              <p className="font-medium" >{lineItem.title}</p>
                              {lineItem.variant.title !== "Default Title" && <p className="text-[14px] mt-1" >{lineItem.variant.title}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-end pr-3 hidden md:table-cell">
                          <span>{moneyFormatter(lineItem.variant.price.currencyCode, lineItem.variant.price.amount)}</span>
                        </td>
                        <td className="py-4 text-end pr-3 hidden sm:table-cell">
                          <span>{lineItem.quantity}</span>
                        </td>
                        <td className="py-4 text-end pr-3">
                          <span>{moneyFormatter(lineItem.discountedTotalPrice.currencyCode, lineItem.discountedTotalPrice.amount)}</span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>

              </tfoot>
            </table>
            <div className="flex flex-wrap lg:flex-col gap-2 text-[#3c3c3c]" >
                <div className="border p-6 bg-[#f7f7f9] rounded-lg" >
                  <h4 className="font-semibold mb-2 text-lg" >Billing Address</h4>
                  <ul>
                    {order.billingAddress.formatted &&
                      order.billingAddress.formatted.map((line) => <li key={line} className="" >{line}</li>)}
                  </ul>
                </div>
                <div className="border p-6 bg-[#f7f7f9] rounded-lg" >
                  <h4 className="font-semibold mb-2 text-lg" >Shipping Address</h4>
                  <ul>
                    {order.shippingAddress.formatted &&
                      order.shippingAddress.formatted.map((line) => <li key={line} className="" >{line}</li>)}
                  </ul>
                </div>
            </div>
          </div>
      </section>
    </main>
  )
}

export default Page
