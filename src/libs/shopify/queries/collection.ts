import { imageFragment } from "../fragment/image";
import { pageInfoFragment } from "../fragment/pageInfo";
import { miniProductFragment } from "../fragment/product";
import { seoFragment } from "../fragment/seo";

const collectionFragment = `
    fragment collection on Collection {
        title
        description
        handle
        seo {
            ...seo
        }
        image {
            ...image
        }
        updatedAt
    }
    ${seoFragment}
    ${imageFragment}
`;

export const getCollectionsQuery = `
    query GetColletions($first: Int!, $after: String) {
        collections(first: $first, after: $after) {
            edges {
                cursor
                node {
                    ...collection
                }
            }
            pageInfo {
                ...pageInfo
            }
        }
    }
    ${pageInfoFragment}
    ${collectionFragment}
`

export const getCollectionProductsQuery = `
    query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
        collection(handle: $handle) {
            title
            description
            image {
                url
                altText
                height
                width
            }
            products(first: $first, after: $after) {
                edges {
                    cursor
                    node {
                        ...product
                    }
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
    ${miniProductFragment}
`