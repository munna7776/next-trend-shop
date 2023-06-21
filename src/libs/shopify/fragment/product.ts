import { imageFragment } from "./image";
import { priceFragment } from "./price";

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
