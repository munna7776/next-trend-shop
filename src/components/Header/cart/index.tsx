import { cartCreate, getCart } from "@/libs/shopify";
import { Cart } from "@/libs/shopify/type";
import { cookies } from "next/headers"
import CartButton from "./cart-button";

export default async function Cart() {
    const cartId = cookies().get("cartId")?.value;
    let cart: Cart | undefined;
    let cartIdUpdated: boolean = false;

    if(cartId) {
        cart = await getCart(cartId)
    }

    if(!cartId || !cart) {
        cart = await cartCreate()
        cartIdUpdated = true
    }

    return <CartButton cart={cart} cartIdUpdated={cartIdUpdated} />
}