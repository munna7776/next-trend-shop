"use client";

import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Cart } from "@/libs/shopify/type";
import { CartIcon } from "@/components/icons";
import CartDrawer from "./cart-drawer";

const CartButton = ({
  cart,
  cartIdUpdated,
}: {
  cart: Cart;
  cartIdUpdated: boolean;
}) => {
  console.log(cart)
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const cartQuantityRef = useRef<number>(cart.totalQuantity);
  const [_,setCookie] = useCookies(["cartId"])

  useEffect(() => {
    if(cartIdUpdated) {
      setCookie("cartId", cart.id, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      })
    }
    return ;
  },[cartIdUpdated, cart.id, setCookie])

  useEffect(() => {
    if (cart.totalQuantity !== cartQuantityRef.current) {
      if(!showCartDrawer) {
        setShowCartDrawer(true);
      }
      cartQuantityRef.current = cart.totalQuantity
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
        <CartDrawer cart={cart} onClick={() => setShowCartDrawer(false)} />
      )}
    </>
  );
};

export default CartButton;