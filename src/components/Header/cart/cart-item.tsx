import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartItemLine } from "@/libs/shopify/type";
import { moneyFormatter } from "@/libs/utils";
import CartItemQuantity from "./cart-item-quantity";

const CartItem = ({ line }: { line: CartItemLine }) => {
  const selectedOtions = line.merchandise.selectedOptions
    .map((option) => `${option.name}: ${option.value}`)
    .join(" , ");
  return (
    <div key={line.id} className="flex gap-5">
      <Link href={`/products/${line.merchandise.product.handle}`}>
        <Image
          src={line.merchandise.image.url}
          alt={line.merchandise.image.url}
          width={90}
          height={110}
          className="h-[110px] rounded-md"
        />
      </Link>
      <div className="flex flex-col">
        <Link href={`/products/${line.merchandise.product.handle}`}>
          <span className="font-semibold">
            {line.merchandise.product.title}
          </span>
        </Link>
        <p className="text-[#333333]">
          {moneyFormatter(
            line.cost.totalAmount.currencyCode,
            line.cost.totalAmount.amount
          )}
        </p>
        <p className="text-[#3c3c3c]">{selectedOtions}</p>
        <CartItemQuantity
          quantity={line.quantity}
          lineId={line.id}
          merchandiseId={line.merchandise.id}
        />
      </div>
    </div>
  );
};


export default CartItem;
