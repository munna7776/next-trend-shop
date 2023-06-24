"use client";

import { useState, useRef, useEffect } from "react";
import { Cart } from "@/libs/shopify/type";
import CartIcon from "./cart-icon";

const CartButton = ({
  cart,
  cartIdUpdated,
}: {
  cart: Cart;
  cartIdUpdated: boolean;
}) => {
  console.log(cart);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const cartQuantityRef = useRef<number>(cart.totalQuantity);

  useEffect(() => {
    if (showCartDrawer) {
      return;
    }
    if (cart.totalQuantity !== cartQuantityRef.current) {
      setShowCartDrawer(true);
    }
  }, [cart.totalQuantity, showCartDrawer]);

  return (
    <>
      <button onClick={() => setShowCartDrawer(true)} className="relative">
        <CartIcon />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-3 -right-3 h-6 w-6 rounded-[50%] font-light bg-black text-white">
            {cart.totalQuantity}
          </span>
        )}
      </button>
      {showCartDrawer && (
        <CartDrawer onClick={() => setShowCartDrawer(false)} />
      )}
    </>
  );
};

export default CartButton;

const CartDrawer = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      {/* <div onClick={onClick} className="absolute left-0 top-0 overflow-hidden w-screen h-screen z-[9999] bg-[#0003] backdrop-blur-[10px]" /> */}
      <div className="fixed top-0 right-0 p-6 box-shadow z-[9999] rounded-l-lg w-full max-w-[400px] bg-[#fbf9f9] h-screen overflow-hidden cart-drawer">
        <div id="heading" className="flex items-center gap-4" >
          <CartIcon />
          <h3 className="text-lg text-[#3c3c3c] font-semibold" >My Cart</h3>
          <button className="ms-auto" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              shapeRendering="geometricPrecision"
              className="h-7"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
