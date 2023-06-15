import { imageFragment } from "../fragment/image";
import { pageInfoFragment } from "../fragment/pageInfo";
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