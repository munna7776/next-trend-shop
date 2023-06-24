import { cartFragment } from "../fragment/cart";

export const getCartQuery = `
query Cart($cartId: ID!) {
    cart(id: $cartId) {
        ...cart
    }
}
${cartFragment}
`