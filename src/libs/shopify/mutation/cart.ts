import { cartFragment } from "../fragment/cart";

export const cartCreateMutation = `
mutation CartCreate {
    cartCreate {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
}
${cartFragment}
`;

export const cartUpdateMutation = `
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
}
${cartFragment}
`;

export const removeFromCartMutation = `
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
            ...cart
        }
    }
}
${cartFragment}
`