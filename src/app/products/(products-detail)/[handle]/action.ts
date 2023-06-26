"use server";

import { cookies } from "next/headers"
import { addToCart } from "@/libs/shopify"

export const buyNow = async (merchandiseId: string, quantity: number) => {
    const cartId = cookies().get("cartId")?.value

    if(!cartId) {
        return new Error("Cart id is missing.")
    }

    try {
        const res = await addToCart(cartId,[{merchandiseId,quantity}])
        return res
    } catch (error) {
        return new Error("Something went wrong. Please try again later",{cause:error})
    }
}