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

export type MailingAddress = {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    countryCodeV2: string;
    firstName: string;
    formatted: string;
    formattedArea: string;
    id: string;
    lastName: string;
    name: string;
    phone: string;
    province: string;
    provinceCode: string;
    zip: string;
}

export type Attribute = {
    key: string;
    value: string;
}


export type OrderLineItem = {
    currentQuantity: number;
    customAttributes: Attribute[];
    discountedTotalPrice: Price;
    quantity: number;
    title: string;
    variant: ShopifyProductVariant & { product: Product }
}

export type OrderFinancialStatus = "AUTHORIZED" | "PARTIALLY_PAID" | "PARTIALLY_REFUNDED" | "VOIDED" | "PAID" | "REFUNDED";
export type OrderFulFillmentStatus = "UNFULFILLED" | "PARTIALLY_FULFILLED" | "FULFILLED" | "RESTOCKED" | "PENDING_FULFILLMENT" | "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "SCHEDULED";

export type Order = {
    billingAddress: MailingAddress;
    cancelReason: "CUSTOMER" | "DECLINED" |"FRAUD" | "INVENTORY" | "OTHER" | null;
    canceledAt: string | null;
    currencyCode: string;
    currentSubtotalPrice: Price;
    currentTotalDuties: Price;
    currentTotalPrice: Price;
    currentTotalTax: Price;
    customAttributes: Attribute[];
    customerLocale: string;
    customerUrl: string;
    email: string;
    financialStatus: OrderFinancialStatus;
    fulfillmentStatus: OrderFulFillmentStatus;
    id: string;
    lineItems: Connection<OrderLineItem>;
    name: string;
    orderNumber: number;
    originalTotalDuties: Price;
    originalTotalPrice: Price;
    phone: string;
    shippingAddress: MailingAddress;
    statusUrl: string;
    subtotalPrice: Price;
    totalPrice: Price;
    totalRefunded: Price;
    totalShippingPrice: Price;
    totalTax: Price;
}

export type Customer = {
    acceptsMarketing: boolean;
    addresses: Connection<MailingAddress>;
    defaultAddress: MailingAddress | null;
    displayName: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    numberOfOrders: number;
    orders: Connection<Order>;
    phone: string | null;
    tags: string[]
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

export type CustomerUserErrors = {
    code: string;
    field: string[];
    message: string;
}


export type ShopifyCreateCustomerReturnType = {
    data: {
        customerCreate: {
            customer: {
                firstName: string;
                lastName: string;
                email: string;
                id: string;
            },
            customerUserErrors: CustomerUserErrors[]
        }
    }
}

export type ShopifyCreateCustomerVariables = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptsMarketing: boolean;
}

export type ShopifyCustomerAccessTokenVariable = {
    email: string;
    password: string;
}

export type ShopifyCustomerAccessTokenCreateReturnType = {
    data: {
        customerAccessTokenCreate: {
            customerAccessToken:  {
                accessToken: string
                expiresAt: string
            } | null,
            customerUserErrors: CustomerUserErrors[]
        }
    }
}
