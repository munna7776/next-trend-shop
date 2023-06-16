import { imageFragment } from "./image";

export const miniProductFragment = `
fragment product on Product {
    id
    title
    handle
    priceRange {
      maxVariantPrice {
        amount
      }
      minVariantPrice {
        amount
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
`;
