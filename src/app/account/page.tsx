import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/nextauth-provider-options";
import { getCustomer } from "@/libs/shopify";
import LogoutButton from "./logout-button";
import Link from "next/link";

const Page = async() => {
  const session = await getServerSession(authOptions)
  if(!session) {
    return redirect("/login")
  }
  const customer = await getCustomer(session.user?.accessToken as string)
  const {orders} = customer
  console.log(orders.length)
  
  return (
    <main>
      <section className="bg-[#F7F7F9] py-6">
        <h1 className="text-center text-[#333333] font-semibold text-2xl sm:text-[32px]" >
          {"Welcome, " + customer.firstName + " " + customer.lastName}
        </h1>
        <LogoutButton />
      </section>
      <section className="bg-white py-10 px-8 flex justify-between" >
        <div id="order-history">
          <h3>
            <span className="text-xl font-medium">Your Orders</span>
            <span className="py-1 px-2 rounded-md bg-gray-500 ml-3 text-[#f7f7f9]">{customer.numberOfOrders}</span>
          </h3>
          {
            orders.length === 0 && (
              <div className="my-6 flex flex-col gap-y-2" >
                <p className="text-lg" >You have not placed any order.</p>
                <Link href="/products/all" className="py-3 px-4 text-center bg-black text-white text-lg rounded-md" >Start shopping now</Link>
              </div>
            )
          }
        </div>
        <div id="address" ></div>
      </section>
    </main>
  )
}

export default Page
