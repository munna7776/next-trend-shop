import { pageInfoFragment } from "./pageInfo";
import { productFragment } from "./product";

export const cartFragment = `
fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      code
      applicable
    }
    lines(first: 10) {
      edges {
        node {
          id
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          quantity
          merchandise {
            ...on ProductVariant {
              id
              title
              image {
                height
                width
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
          quantity
        }
      }
      pageInfo {
        ...pageInfo
      }
    }
    totalQuantity
  }
  ${productFragment}
  ${pageInfoFragment}
`;
