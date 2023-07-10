import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/nextauth-provider-options";
import { getCustomer } from "@/libs/shopify";
import LogoutButton from "./logout-button";

const Page = async() => {
  const session = await getServerSession(authOptions)
  if(!session) {
    return redirect("/login")
  }
  const customer = await getCustomer(session.user?.accessToken as string)
  
  return (
    <main>
      <section className="bg-[#F7F7F9] py-6">
        <h1 className="text-center text-[#333333] font-semibold text-2xl sm:text-[32px]" >
          {"Welcome, " + customer?.firstName + " " + customer?.lastName}
        </h1>
        <LogoutButton />
      </section>
      <section className="bg-white py-10 px-4 flex justify-between" >
        <div id="order-history" ></div>
        <div id="address" ></div>
      </section>
    </main>
  )
}

export default Page
