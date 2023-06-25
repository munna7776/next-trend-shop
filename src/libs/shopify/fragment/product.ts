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
}
`;
