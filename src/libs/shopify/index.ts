import { redirect } from "next/navigation";
import { SHOPIFY_GRAPHQL_ENDPOINT, TAGS } from "../const";
import {
  addToCartMutation,
  cartCreateMutation,
  cartDiscountCodesUpdateMuation,
  cartUpdateMutation,
  removeFromCartMutation,
} from "./mutation/cart";
import {
  customerAccessTokenCreate,
  customerAddressCreateMuation,
  customerAddressDelete,
  customerAddressUpdateMutation,
  customerCreate,
  customerDefaultAddressUpdateMutaion,
  customerRecoverMutation,
  customerResetByURLMutation,
} from "./mutation/customer";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getCustomerQuery, orderQuery } from "./queries/customer";
import {
  getAllProductsQuery,
  getProductDetailsQuery,
  productRecommendationsQuery,
} from "./queries/product";
import {
  CartItemLine,
  Connection,
  Customer,
  CustomerUserErrors,
  Image,
  MailingAddress,
  MailingAddressInput,
  Order,
  OrderLineItem,
  ShopifyAddToCartReturnType,
  ShopifyAddToCartVariables,
  ShopifyAllProductsReturnType,
  ShopifyCartCreateReturnType,
  ShopifyCartDiscountUpdatesReturnType,
  ShopifyCartLinesRemoveReturnType,
  ShopifyCollection,
  ShopifyCollectionProduct,
  ShopifyCollectionProductReturnType,
  ShopifyCollectionsReturnType,
  ShopifyCollectionsVariables,
  ShopifyCreateCustomerReturnType,
  ShopifyCreateCustomerVariables,
  ShopifyCustomerAccessTokenCreateReturnType,
  ShopifyCustomerAccessTokenVariable,
  ShopifyCustomerAddressCreate,
  ShopifyCustomerAddressUpdate,
  ShopifyCustomerDefaultAddressUpdate,
  ShopifyCustomerOrder,
  ShopifyGetCartReturnType,
  ShopifyProductReturnType,
  ShopifyProductVariant,
  ShopifyUpdateCartReturnType,
  ShopifyUpdateCartVariables,
} from "./type";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const url = `${domain}${SHOPIFY_GRAPHQL_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN!;

export const shopifyFetch = async <T, U extends unknown>({
  cache = "force-cache",
  headers,
  tags,
  query,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  query: string;
  variables?: U;
}): Promise<T> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      cache,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      ...(tags && { next: { tags } }),
    });
    const result = await res.json();
    if (result.errors) {
      throw {
        message: result.errors[0].message,
        code: result.errors[0].extensions.code,
        status: res.status,
      };
    }

    return result;
  } catch (e) {
    throw e;
  }
};

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array?.edges?.map((edge) => edge.node);
};

export const getCollections = async (
  variables: ShopifyCollectionsVariables
) => {
  const res = await shopifyFetch<
    ShopifyCollectionsReturnType,
    ShopifyCollectionsVariables
  >({
    query: getCollectionsQuery,
    variables: variables,
    tags: [TAGS.collections],
  });

  const collections = removeEdgesAndNodes(
    res?.data?.collections
  ) as ShopifyCollection[];
  const pageInfo = res?.data?.collections?.pageInfo;

  return {
    collections,
    pageInfo,
  };
};

export const getCollectionProducts = async (
  variables: ShopifyCollectionsVariables & { handle: string }
) => {
  const res = await shopifyFetch<
    ShopifyCollectionProductReturnType,
    ShopifyCollectionsVariables & { handle: string }
  >({
    query: getCollectionProductsQuery,
    variables: variables,
    tags: [TAGS.collections, TAGS.products],
  });

  const { title, description, image, products } = res?.data?.collection;
  const reshapedProducts = removeEdgesAndNodes(
    products
  ) as ShopifyCollectionProduct[];
  const collectionProductPageInfo = products.pageInfo;

  return {
    title,
    description,
    collectionImage: image,
    products: reshapedProducts,
    pageInfo: collectionProductPageInfo,
  };
};

export const getAllProducts = async (
  variables: ShopifyCollectionsVariables
) => {
  const res = await shopifyFetch<
    ShopifyAllProductsReturnType,
    ShopifyCollectionsVariables
  >({
    query: getAllProductsQuery,
    variables,
    tags: [TAGS.products],
  });

  const products = removeEdgesAndNodes(
    res?.data?.products
  ) as ShopifyCollectionProduct[];

  return {
    products,
    pageInfo: res?.data?.products?.pageInfo,
  };
};

export const getProductDetails = async (handle: string) => {
  const res = await shopifyFetch<ShopifyProductReturnType, { handle: string }>({
    query: getProductDetailsQuery,
    variables: { handle },
    tags: [TAGS.products],
  });

  const variants = removeEdgesAndNodes(
    res?.data?.product?.variants
  ) as ShopifyProductVariant[];
  const images = removeEdgesAndNodes(res?.data?.product?.images) as Image[];

  return {
    ...res?.data?.product,
    images,
    variants,
  };
};

export const getProductRecommendations = async (productId: string) => {
  const res = await shopifyFetch<
    { data: { productRecommendations: ShopifyCollectionProduct[] } },
    { productId: string }
  >({
    query: productRecommendationsQuery,
    variables: { productId },
    tags: [TAGS.products],
  });

  return res.data.productRecommendations;
};

export const cartCreate = async () => {
  const res = await shopifyFetch<ShopifyCartCreateReturnType, unknown>({
    query: cartCreateMutation,
    cache: "no-store",
  });

  const { cart } = res?.data?.cartCreate;
  const lines = removeEdgesAndNodes(cart.lines) as CartItemLine[];

  return {
    ...cart,
    lines,
  };
};

export const getCart = async (cartId: string) => {
  const res = await shopifyFetch<ShopifyGetCartReturnType, { cartId: string }>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });
  const lines = removeEdgesAndNodes(res?.data?.cart?.lines) as CartItemLine[];

  return {
    ...res?.data?.cart,
    lines,
  };
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) => {
  const res = await shopifyFetch<
    ShopifyAddToCartReturnType,
    ShopifyAddToCartVariables
  >({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  const cartLines = removeEdgesAndNodes(
    res?.data?.cartLinesAdd?.cart?.lines
  ) as CartItemLine[];

  return {
    ...res?.data?.cartLinesAdd?.cart,
    lines: cartLines,
  };
};

export const updateCart = async (
  cartId: string,
  lines: {
    id: string;
    merchandiseId: string;
    quantity: number;
  }[]
) => {
  const res = await shopifyFetch<
    ShopifyUpdateCartReturnType,
    ShopifyUpdateCartVariables
  >({
    query: cartUpdateMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  const cartLines = removeEdgesAndNodes(
    res?.data?.cartLinesUpdate?.cart?.lines
  ) as CartItemLine[];

  return {
    ...res?.data?.cartLinesUpdate?.cart,
    lines: cartLines,
  };
};

export const removeCart = async (cartId: string, lineIds: string[]) => {
  const res = await shopifyFetch<
    ShopifyCartLinesRemoveReturnType,
    { cartId: string; lineIds: string[] }
  >({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  const cartLines = removeEdgesAndNodes(
    res?.data?.cartLinesRemove?.cart?.lines
  ) as CartItemLine[];

  return {
    ...res?.data?.cartLinesRemove?.cart,
    lines: cartLines,
  };
};

export const cartDiscountCodesUpdate = async (
  cartId: string,
  discountCodes: string[]
) => {
  const res = await shopifyFetch<
    ShopifyCartDiscountUpdatesReturnType,
    { cartId: string; discountCodes: string[] }
  >({
    query: cartDiscountCodesUpdateMuation,
    variables: { cartId, discountCodes },
    cache: "no-store",
  });
  return {
    errors: res?.data?.cartDiscountCodesUpdate?.userErrors,
  };
};

export const createCustomer = async (input: ShopifyCreateCustomerVariables) => {
  const res = await shopifyFetch<
    ShopifyCreateCustomerReturnType,
    { input: ShopifyCreateCustomerVariables }
  >({
    query: customerCreate,
    variables: { input },
    cache: "no-store",
  });

  return {
    customer: res?.data?.customerCreate?.customer,
    errors: res?.data?.customerCreate?.customerUserErrors,
  };
};

export const createCustomerAccessToken = async (
  input: ShopifyCustomerAccessTokenVariable
) => {
  const res = await shopifyFetch<
    ShopifyCustomerAccessTokenCreateReturnType,
    { input: ShopifyCustomerAccessTokenVariable }
  >({
    query: customerAccessTokenCreate,
    variables: { input },
    cache: "no-store",
  });

  return {
    customerAccessToken: res.data.customerAccessTokenCreate.customerAccessToken,
    errors: res.data.customerAccessTokenCreate.customerUserErrors,
  };
};

export const getCustomer = async (accessToken: string) => {
  const {
    data: { customer },
  } = await shopifyFetch<
    { data: { customer: Customer | null } },
    { accessToken: string }
  >({
    query: getCustomerQuery,
    variables: { accessToken },
    cache: "no-store",
  });

  if (!customer) {
    const res = await fetch("/api/auth/csrf");
    const token: { csrfToken: string } = await res.json();

    const signoutRes = await fetch("/api/auth/signout", {
      method: "POST",
      body: JSON.stringify({ csrfToken: token.csrfToken }),
    });
    await signoutRes.json();
    redirect("/login");
  }

  const { addresses, orders } = customer;
  const newAddresses = removeEdgesAndNodes(addresses) as MailingAddress[];
  const newOrders = removeEdgesAndNodes(orders) as Order[];
  const newOrdersWithReshapedLineItems = newOrders.map((order) => {
    const newLineItems = removeEdgesAndNodes(
      order.lineItems
    ) as OrderLineItem[];
    return {
      ...order,
      lineItems: newLineItems,
    };
  });

  return {
    ...customer,
    addresses: newAddresses,
    orders: newOrdersWithReshapedLineItems,
  };
};

export const deleteCustomerAddress = async (variables: {
  id: string;
  token: string;
}) => {
  const res = await shopifyFetch<
    {
      data: {
        customerAddressDelete: {
          deletedCustomerAddressId: string;
          customerUserErrors: CustomerUserErrors[];
        };
      };
    },
    { id: string; token: string }
  >({
    query: customerAddressDelete,
    variables,
    cache: "no-store",
  });

  return res.data.customerAddressDelete;
};

export const customerAddressCreate = async (variables: {
  address: Omit<MailingAddressInput, "checked">;
  token: string;
}) => {
  const res = await shopifyFetch<
    ShopifyCustomerAddressCreate,
    typeof variables
  >({
    query: customerAddressCreateMuation,
    variables: variables,
    cache: "no-store",
  });
  return {
    id: res.data.customerAddressCreate.customerAddress?.id,
    errors: res.data.customerAddressCreate.customerUserErrors
  }
};

export const customerAddressUpdate = async (variables: {
  address: Omit<MailingAddressInput, "checked">;
  id: string;
  token: string;
}) => {
  const res = await shopifyFetch<
    ShopifyCustomerAddressUpdate,
    typeof variables
  >({
    query: customerAddressUpdateMutation,
    variables,
    cache: "no-store",
  });
  return {
    id: res.data.customerAddressUpdate.customerAddress?.id,
    errors: res.data.customerAddressUpdate.customerUserErrors
  };
};

export const customerDefaultAddressUpdate = async (
  addressId: string,
  token: string
) => {
  const res = await shopifyFetch<
    ShopifyCustomerDefaultAddressUpdate,
    { addressId: string; token: string }
  >({
    query: customerDefaultAddressUpdateMutaion,
    variables: { addressId, token },
    cache: "no-store"
  });
  return res.data.customerDefaultAddressUpdate.customerUserErrors
};

export const getCustomerOrder = async (orderId: string) => {
  const res = await shopifyFetch<ShopifyCustomerOrder, { orderId: string }>({
    query: orderQuery,
    variables: { orderId },
    cache: "no-store",
  });

  const { lineItems } = res.data.node;
  const reshapedLineItems = removeEdgesAndNodes(lineItems) as OrderLineItem[];

  return {
    ...res.data.node,
    lineItems: reshapedLineItems,
  };
};

export const customerRecover = async (email: string) => {
  const res = await shopifyFetch<
    { data: { customerRecover: { customerUserErrors: CustomerUserErrors[] } } },
    { email: string }
  >({
    query: customerRecoverMutation,
    variables: { email },
    cache: "no-store",
  });

  return res.data.customerRecover.customerUserErrors;
};

export const customerResetByURL = async (
  password: string,
  resetUrl: string
) => {
  const res = await shopifyFetch<
    {
      data: {
        customerResetByUrl: { customerUserErrors: CustomerUserErrors[] };
      };
    },
    { password: string; resetUrl: string }
  >({
    query: customerResetByURLMutation,
    variables: { password, resetUrl },
    cache: "no-store",
  });

  return res.data.customerResetByUrl.customerUserErrors;
};
