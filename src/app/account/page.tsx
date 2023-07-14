import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/libs/nextauth-provider-options";
import { getCustomer } from "@/libs/shopify";
import LogoutButton from "./logout-button";
import { Order, OrderLineItem } from "@/libs/shopify/type";
import { statusMessage } from "@/libs/utils";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  const customer = await getCustomer(session.user?.accessToken as string);
  const { orders } = customer;

  return (
    <main>
      <section className="bg-[#F7F7F9] py-6">
        <h1 className="text-center text-[#333333] font-semibold text-2xl sm:text-[32px]">
          {"Welcome, " + customer.firstName + " " + customer.lastName}
        </h1>
        <LogoutButton />
      </section>
      <section className="bg-white py-10 px-8">
        <h3>
          <span className="text-xl font-medium">Your Orders</span>
          <span className="py-1 px-2 rounded-md bg-gray-500 ml-3 text-[#f7f7f9]">
            {orders.length}
          </span>
        </h3>
        {orders.length === 0 && (
          <div className="my-6 flex flex-col gap-y-2">
            <p className="text-lg">You have not placed any order.</p>
            <Link
              href="/products/all"
              className="py-3 px-4 text-center bg-black text-white text-lg rounded-md"
            >
              Start shopping now
            </Link>
          </div>
        )}
        {orders.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Page;

const OrderCard = ({
  order,
}: {
  order: Omit<Order, "lineItems"> & { lineItems: OrderLineItem[] };
}) => {
  const { lineItems } = order
  // console.log(order.fulfillmentStatus)

  return (
    <li className="border rounded-lg hover:bg-gray-100">
      <Link href="/account" className="flex flex-col md:items-center md:flex-row " >
        <Image
          src={lineItems[0].variant?.image ? lineItems[0].variant.image.url : lineItems[0].variant.product.featuredImage.url}
          alt={`${lineItems[0].title} order image`}
          width={400}
          height={400}
          className="w-full object-cover rounded-t-lg rounded-b-none md:rounded-l-lg md:rounded-r-none h-64 sm:h-80 md:h-64 md:w-48"
        />
        <div className="flex flex-col gap-1 px-4 py-4 md:py-0" >
          <h3 className="text-lg md:text-xl font-semibold text-gray-800" >{lineItems.length > 1 ? `${lineItems[0].title} + ${lineItems.length - 1} more` : lineItems[0].title}</h3>
          <p className="text-base lg:text-lg text-gray-600" >
            <span className="sr-only">Order ID</span>
            <span>{`Order no. - #${order.orderNumber}`}</span>
          </p>
          <p className="text-base lg:text-lg text-gray-600" >
            <span className="sr-only">Order Date</span>
            <span>{new Date(order.processedAt).toDateString()}</span>
          </p>
          <span className="inline-block mt-1 w-max bg-[#F7F7F9] text-base lg:text-lg text-gray-600 border border-gray-400 rounded-xl py-1 px-3" >{statusMessage(order.fulfillmentStatus)}</span>
        </div>
      </Link>
    </li>
  );
};
