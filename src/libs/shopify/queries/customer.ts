import { imageFragment } from "../fragment/image";
import { productFragment } from "../fragment/product"

const orderLineItemFragment = `
fragment orderLineItem on OrderLineItem {
  currentQuantity
  customAttributes {
    key
    value
  }
  discountedTotalPrice {
    amount
    currencyCode
  }
  quantity
  title
  variant {
    id
    title
    image {
      ...image
    }
    price {
      amount
      currencyCode
    }
    quantityAvailable
    selectedOptions {
      name
      value
    }
    sku
    product {
      ...product
    }
  }
}
${productFragment}
${imageFragment}
`;

export const addressFragment = (name: string) => {
  return (
    `
      fragment ${name} on MailingAddress {
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        formatted(withName:true, withCompany:false)
        id
        lastName
        name
        phone
        province
        provinceCode
        zip
      }
    `
  )
}

const orderFragment = `
  fragment order on Order {
    billingAddress {
      ...orderAddress
    }
    cancelReason
    canceledAt
    currencyCode
    currentSubtotalPrice {
      amount
      currencyCode
    }
    currentTotalDuties {
      amount
      currencyCode
    }
    currentTotalTax {
      amount
      currencyCode
    }
    customAttributes {
      key
      value
    }
    customerLocale
    email
    financialStatus
    fulfillmentStatus
    id
    lineItems(first: 20) {
      edges {
        node {
          ...orderLineItem
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    name
    orderNumber
    originalTotalDuties {
      amount
      currencyCode
    }
    originalTotalPrice {
      amount
      currencyCode
    }
    phone
    processedAt
    shippingAddress {
      ...shippingAddress
    }
    statusUrl
    subtotalPrice {
      amount
      currencyCode
    }
    totalPrice {
      amount
      currencyCode
    }
    totalRefunded {
      amount
      currencyCode
    }
    totalShippingPrice {
      amount
      currencyCode
    }
    totalTax {
      amount
      currencyCode
    }
  }
  ${addressFragment("orderAddress")}
  ${addressFragment("shippingAddress")}
  ${orderLineItemFragment}
`

export const getCustomerQuery = `
query customer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      acceptsMarketing
      addresses(first: 10) {
        edges {
          node {
            ...address
          }
          cursor
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
      }
      defaultAddress {
        ...defaultAddress
      }
      displayName
      email
      firstName
      id
      lastName
      numberOfOrders
      orders(first: 10) {
        edges {
          node {
            ...order
          }
          cursor
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
      }
      phone
      tags
    }
}
${addressFragment("address")}
${addressFragment("defaultAddress")}
${orderFragment}
`;

export const orderQuery = `
query CustomerOrder($orderId: ID!) {
    node(id: $orderId) {
        ... on Order {
            ...order
        }
    }
}
${orderFragment}
`;

