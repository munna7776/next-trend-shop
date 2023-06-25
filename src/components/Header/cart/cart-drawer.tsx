import { CartIcon, CrossIcon } from "@/components/icons";
import { Cart } from "@/libs/shopify/type";

import CartItem from "./cart-item";

const CartDrawer = ({ onClick, cart }: { onClick: () => void; cart: Cart }) => {
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
          <div className="mt-8 flex flex-col items-center">
            <CartIcon className="h-20" />
            <h2 className="text-lg my-8 font-semibold text-[#3c3c3c]">
              Your cart is empty
            </h2>
            <button className="block w-full text-xl p-4 rounded-md my-3 bg-black text-white">
              Continue Shopping
            </button>
          </div>
        )}
        {cart.lines.length > 0 && (
          <div className="flex flex-col gap-y-4 my-5 h-[65vh] overflow-y-auto ">
            {cart.lines.map((line) => {
              return <CartItem key={line.id} line={line} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
