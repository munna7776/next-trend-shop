export type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export type PageInfo = {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
}

export type Edge<T> = { 
    node: T; 
    cursor: string;
};

export type Connection<T> = {
    edges: Edge<T>[];
    pageInfo: PageInfo;
}

export type Image = {
    altText: string;
    height: number;
    width: number;
    url: string;
}

export type SEO = {
    title: string;
    description: string;
}

export type MediaContentType = "VIDEO" | "IMAGE" | "EXTERNAL_VIDEO" | "MODEL_3D";

export type ShopifyCollection = {
    description: string;
    image: Image;
    // productsCount: number;
    handle: string;
    seo: SEO;
    title: string;
    updatedAt: string;
}

export type ShopifyCollectionsVariables = {
    first: number;
    after?: string;
}

export type ShopifyCollectionsReturnType = {
    data: {
        collections: Connection<ShopifyCollection>
    }
}

// const collections: ShopifyCollectionsReturnType = {
//     data: {
//         collections: {
//             edges: [
//                 {
//                     cursor: '',
//                     node: {
//                         description: ''
//                     }
//                 }
//             ],
//             pageInfo: {
//                 startCursor: '',
//                 endCursor: '',
//                 hasNextPage: false,
//                 hasPreviousPage: false
//             }
//         }
//     }
// }
