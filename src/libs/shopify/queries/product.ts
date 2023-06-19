import { pageInfoFragment } from "../fragment/pageInfo";
import { miniProductFragment } from "../fragment/product";

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
`