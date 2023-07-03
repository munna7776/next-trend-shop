"use server";

import { removeCart } from "@/libs/shopify";
import { cookies } from "next/headers";

export const deleteCartItem = async (lineId: string): Promise<Error | undefined> => {
    const cartId = cookies().get('cartId')?.value;

    if(!cartId) {
        return new Error("Cart id is missing.")
    }

    try {
        const res = await removeCart(cartId,[lineId])
    } catch (error) {
        return new Error("Unable to remove the cart item")
    }

}