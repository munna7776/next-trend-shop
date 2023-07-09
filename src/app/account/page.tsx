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
  const res = await getCustomer(session.user?.accessToken as string)
  console.log(res)
  return (
    <main>
      <section className="bg-[#F7F7F9] py-6">
        <h1 className="text-center text-[#333333] font-semibold text-2xl sm:text-[32px]" >
          {"Welcome, " + res.firstName + " " + res.lastName}
        </h1>
        <LogoutButton />
      </section>
    </main>
  )
}

export default Page
