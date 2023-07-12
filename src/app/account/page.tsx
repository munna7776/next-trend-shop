import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/libs/nextauth-provider-options";
import { getCustomer } from "@/libs/shopify";
import LogoutButton from "./logout-button";
import { Order, OrderLineItem } from "@/libs/shopify/type";

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
          <ul className="flex flex-wrap mt-4 gap-6">
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
  console.log(order.fulfillmentStatus)

  return (
    <li className="border rounded-md">
      <Link href="/account">
        <div className="card-image rounded-md bg-[#f7f7f9]" >
          <Image
            src={lineItems[0].variant?.image ? lineItems[0].variant.image.url : lineItems[0].variant.product.featuredImage.url}
            alt={`${lineItems[0].title} order image`}
            width={168}
            height={168}
            className="w-full rounded-md object-cover aspect-[inherit]"
          />
        </div>
        <h3>{lineItems.length > 1 ? `${lineItems[0].title} + ${lineItems.length - 1} more` : lineItems[0].title}</h3>
        <p>
          <span className="sr-only">Order ID</span>
          <span>{`Order no. - ${order.orderNumber}`}</span>
        </p>
        <p>
          <span className="sr-only">Order Date</span>
          <span>{`Processed at - ${new Date(order.processedAt).toDateString()}`}</span>
        </p>
      </Link>
    </li>
  );
};
