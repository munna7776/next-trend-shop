import { imageFragment } from "./image";
import { pageInfoFragment } from "./pageInfo";
import { priceFragment } from "./price";
import { seoFragment } from "./seo";

export const miniProductFragment = `
fragment product on Product {
    id
    title
    handle
    priceRange {
      maxVariantPrice {
        ...price
      }
      minVariantPrice {
        ...price
      }
    }
    featuredImage {
      ...image
    }
    images(first:10) {
      edges {
        node {
          ...image
        }
      }
    }
  }
  ${imageFragment}
  ${priceFragment}
`;

export const productFragment = `
fragment product on Product {
  title
  description
  handle
  featuredImage {
    altText
    height
    url
    width
  }
  id
  images(first:10){
    edges{
      cursor
      node{
        altText
        height
        url
        width
      }
    }
    pageInfo {
      startCursor
      hasNextPage
      hasPreviousPage
      endCursor
    }
  }
  isGiftCard
  options(first:10) {
    name
    values
  }
  priceRange{
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  seo {
    description
    title
  }
  tags
  totalInventory
  variants(first:20) {
    edges {
      cursor
      node {
        title
        id
        image {
          altText
          height
          url
          width
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
        unitPrice {
          amount
          currencyCode
        }
      }
    }
    pageInfo {
      startCursor
      hasNextPage
      hasPreviousPage
      endCursor
    }
  }
}
`;
