import { SHOPIFY_GRAPHQL_ENDPOINT } from "../const";
import { getCollectionsQuery } from "./queries/collection";
import { Connection, ShopifyCollection, ShopifyCollectionsReturnType, ShopifyCollectionsVariables } from "./type";


const domain = process.env.SHOPIFY_STORE_DOMAIN!
const url = `${domain}${SHOPIFY_GRAPHQL_ENDPOINT}`
const key = process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN!

export const shopifyFetch = async<T,U>({
    cache="force-cache",
    headers,
    tags,
    query,
    variables
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    tags?: string[];
    query: string;
    variables: U
}): Promise<T> => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers,
            },
            cache,
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            ...(tags && { next: { tags }})
        })

        console.log(res.status)

        const result = await res.json()

        if(result.errors) {
            throw {
                message: result.errors[0].message, 
                code: result.errors[0].extensions.code,
                status: res.status
            }
        }

        return result

    } catch (e) {
        throw e
    }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
    return array.edges.map(edge => edge.node)
}

export const getCollections = async(variables: ShopifyCollectionsVariables) => {
    const res = await shopifyFetch<ShopifyCollectionsReturnType,ShopifyCollectionsVariables>({
        query: getCollectionsQuery,
        variables: variables
    })

    const collections = removeEdgesAndNodes(res?.data?.collections) as ShopifyCollection[]
    const pageInfo = res?.data?.collections?.pageInfo

    return {
        collections,
        pageInfo
    }
}