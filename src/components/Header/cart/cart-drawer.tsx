import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CartIcon, CrossIcon } from "@/components/icons";
import { Cart } from "@/libs/shopify/type";
import CartItem from "./cart-item";
import { moneyFormatter } from "@/libs/utils";
import { Input } from "@/components/UI";
import { applyDiscountCode } from "./action";

const CartDrawer = ({ onClick, cart }: { onClick: () => void; cart: Cart }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    cost: { subtotalAmount, totalAmount, totalTaxAmount },
    discountCodes,
  } = cart;
  const codes =
    discountCodes.map((discount) => discount.code).join(", ") || null;

  return (
    <>
      <div
        onClick={onClick}
        className="absolute left-0 top-0 overflow-hidden w-screen h-screen z-[9999] bg-[#0003]"
      />
      <div className="fixed top-0 right-0 p-6 box-shadow z-[9999] rounded-l-lg w-full max-w-[400px] bg-[#fbf9f9] h-screen overflow-hidden cart-drawer">
        <div id="heading" className="flex items-center gap-4">
          <CartIcon />
          <h3 className="text-lg text-[#3c3c3c] font-semibold">My Cart</h3>
          <button onClick={onClick} className="ms-auto">
            <CrossIcon />
          </button>
        </div>
        {cart.lines.length === 0 && (
          <div className="mt-[100px] flex flex-col items-center">
            <CartIcon height={80} width={80} />
            <h2 className="text-lg my-8 font-semibold text-[#3c3c3c]">
              Your cart is empty
            </h2>
            <button className="block w-full text-xl p-4 rounded-md my-3 bg-black text-white">
              Continue Shopping
            </button>
          </div>
        )}
        {cart.lines.length > 0 && (
          <>
            <div className="flex flex-col gap-y-2 my-5 cart-item-container overflow-y-auto ">
              {cart.lines.map((line) => {
                return <CartItem key={line.id} line={line} />;
              })}
            </div>
            <CodeDiscount codes={codes} />
            <div className="mt-3 border-t border-b border-gray-200 py-2">
              <div className="mb-2 flex items-center justify-between">
                <h4>SubTotal</h4>
                <p>
                  {moneyFormatter(
                    subtotalAmount.currencyCode,
                    subtotalAmount.amount
                  )}
                </p>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <h4>Taxes</h4>
                <p>
                  {moneyFormatter(
                    totalTaxAmount.currencyCode,
                    totalTaxAmount.amount
                  )}
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <h4>Total Amount</h4>
              <p>
                {moneyFormatter(totalAmount.currencyCode, totalAmount.amount)}
              </p>
            </div>
            {session?.user?.accessToken ? (
              <a
                href={cart.checkoutUrl}
                className="block w-full rounded-lg p-3 text-center bg-black opacity-90 text-white font-semibold hover:opacity-100"
              >
                Proceed to checkout
              </a>
            ) : (
              <Link
                href="/login"
                onClick={onClick}
                className="block w-full rounded-lg p-3 text-center bg-black opacity-90 text-white font-semibold hover:opacity-100"
              >
                Proceed to checkout
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

const CodeDiscount = ({ codes }: { codes: string | null }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      discount: "",
    },
  });
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const discountFormSubmitHandler: SubmitHandler<{ discount: string }> = async (
    data
  ) => {
    if (data.discount.trim().length === 0) {
      return toast.error("Please enter discount code!");
    }
    startTransition(async () => {
      const result = await applyDiscountCode(data.discount);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className={!codes ? "block" : "hidden"}>
      <form
        onSubmit={handleSubmit(discountFormSubmitHandler)}
        className="w-full flex gap-2 justify-between items-center"
      >
        <Input
          register={register}
          placeholder="Discount Code"
          name="discount"
        />
        <button type="submit" disabled={pending} className="font-medium">
          Apply
        </button>
      </form>
    </div>
  );
};
