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

export type Price = {
    amount: number;
    currencyCode: string;
}

export type PriceRange = {
    minVariantPrice: Price;
    maxVariantPrice: Price;
}

export type MediaContentType = "VIDEO" | "IMAGE" | "EXTERNAL_VIDEO" | "MODEL_3D";

export type ShopifyCollection = {
    description: string;
    image: Image;
    handle: string;
    seo: SEO;
    title: string;
    updatedAt: string;
}

export type ShopifyCollectionsVariables = {
    first: number;
    after?: string;
}

export type ShopifyCollectionProduct = {
    id: string;
    title: string;
    handle: string;
    priceRange: PriceRange;
    featuredImage: Image;
    images: Connection<Image>;
}

export type ShopifyProductVariant = {
    id: string;
    title: string;
    image: Image;
    price: Price;
    quantityAvailable: number;
    selectedOptions: {name: string; value: string}[];
    sku: string;
}

export type ShopifyProduct = {
    title: string;
    description: string;
    handle: string;
    featuredImage: Image;
    id: string;
    images: Connection<Image>;
    isGiftCard: boolean;
    options: {name: string;values:string[]}[];
    priceRange: PriceRange;
    seo: SEO;
    tags: string[];
    totalInventory: number;
    variants: Connection<ShopifyProductVariant>
}

export type Product = Omit<ShopifyProduct, "variants"| "images">


export type CartItemLine = {
    id: string;
    cost: {
        totalAmount: Price;
    };
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        image: Image;
        price: Price;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        product: Product
    }
}

export type ShopifyCart = {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Price;
        totalAmount: Price;
        totalTaxAmount: Price;
    };
    lines: Connection<CartItemLine>;
    totalQuantity: number;
}

export type Cart = Omit<ShopifyCart,"lines"> & {
    lines: CartItemLine[]
}

export type ShopifyCollectionProductReturnType = {
    data: {
        collection: {
            title: string;
            description: string;
            image: Image;
            products: Connection<ShopifyCollectionProduct>;
        }
    }
}

export type ShopifyCollectionsReturnType = {
    data: {
        collections: Connection<ShopifyCollection>;
    }
}

export type ShopifyAllProductsReturnType = {
    data: {
        products: Connection<ShopifyCollectionProduct>
    }
}

export type ShopifyProductReturnType = {
    data: {
        product: ShopifyProduct
    }
}

export type ShopifyCartCreateReturnType = {
    data: {
        cartCreate: {
            cart: ShopifyCart
        }
    }
}

export type ShopifyGetCartReturnType = {
    data: {
        cart: ShopifyCart
    }
}

export type ShopifyAddToCartVariables = {
    cartId: string;
    lines: {merchandiseId:string; quantity: number}[];
}

export type ShopifyAddToCartReturnType = {
    data: {
        cartLinesAdd: {
            cart: ShopifyCart
        }
    }
}

export type ShopifyUpdateCartVariables = {
    cartId: string;
    lines: {
        id: string;
        merchandiseId:string; 
        quantity: number
    }[]
}


export type ShopifyUpdateCartReturnType = {
    data: {
        cartLinesUpdate: {
            cart: ShopifyCart
        }
    }
}

export type ShopifyCartLinesRemoveReturnType = {
    data: {
        cartLinesRemove: {
            cart: ShopifyCart
        }
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
