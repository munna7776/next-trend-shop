"use server";

import { cartDiscountCodesUpdate, removeCart } from "@/libs/shopify";
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

export const applyDiscountCode = async(discountCode: string) => {
    const cartId = cookies().get('cartId')?.value;
    if(!cartId) {
        return { error: "Cart id is missing." }
    }
    try {
        const res = await cartDiscountCodesUpdate(cartId, [discountCode])
        if(res.errors?.length > 0) {
            return { error: res.errors[0].message }
        }
    } catch (error) {
        console.log(error)
        return { error: "Unable to apply discount codes" }
    }
}