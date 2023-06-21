import { imageFragment } from "../fragment/image";
import { pageInfoFragment } from "../fragment/pageInfo";
import { priceFragment } from "../fragment/price";
import { miniProductFragment } from "../fragment/product";
import { seoFragment } from "../fragment/seo";

export const getAllProductsQuery = `
query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...product
        }
      }
      pageInfo {
        ...pageInfo
      }
    }
}
${miniProductFragment}
${pageInfoFragment}
`;

export const getProductDetailsQuery = `
query GetProductDetails($handle: String!) {
  product(handle: $handle) {
    title
    description
    handle
    featuredImage {
      ...image
    }
    id
    images(first:10){
      edges{
        cursor
        node{
          ...image
        }
      }
      pageInfo {
        ...pageInfo
      }
    }
    isGiftCard
    options(first:10) {
      name
      values
    }
    priceRange{
      minVariantPrice {
        ...price
      }
      maxVariantPrice {
        ...price
      }
    }
    seo {
      ...seo
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
            ...image
          }
          price {
            ...price
          }
          quantityAvailable
          selectedOptions {
            name
            value
          }
          unitPrice {
            ...price
          }
        }
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
}
${priceFragment}
${imageFragment}
${seoFragment}
${pageInfoFragment}
`