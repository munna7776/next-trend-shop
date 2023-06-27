import { PageInfo, ShopifyCollectionProduct } from "@/libs/shopify/type";
import { Reducer, useEffect, useReducer, useRef } from "react";

type ProductsState = {
  loading: boolean;
  productLists: ShopifyCollectionProduct[];
  pageInfoDetail: PageInfo;
};

type ProductsAction =
  | { type: "LOADING_TRUE" }
  | { type: "LOADING_FALSE" }
  | { type: "SET_PRODUCTS_INFO"; payload: Omit<ProductsState, "loading"> };

const reducer = (
  state: ProductsState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case "LOADING_TRUE": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LOADING_FALSE": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_PRODUCTS_INFO": {
      const newProductLists = [
        ...state.productLists,
        ...action.payload.productLists,
      ];
      return {
        ...state,
        loading: false,
        productLists: newProductLists,
        pageInfoDetail: { ...action.payload.pageInfoDetail },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const useProducts = (products: ShopifyCollectionProduct[],pageInfo: PageInfo) => {
  const initalState: ProductsState = {
    loading: false,
    productLists: products,
    pageInfoDetail: pageInfo
  };
  const [state, dispatch] = useReducer<Reducer<ProductsState, ProductsAction>>(
    reducer,
    initalState
  );
  const {
    pageInfoDetail: { hasNextPage, endCursor },
  } = state;
  const elementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    const url = `/api/products/all?first=10&after=${endCursor}`;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          try {
            dispatch({ type: "LOADING_TRUE" });
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error("Unable to fetch data", { cause: res.status });
            }
            const data = (await res.json()) as {
              products: ShopifyCollectionProduct[];
              pageInfo: PageInfo;
            };
            dispatch({
              type: "SET_PRODUCTS_INFO",
              payload: {
                productLists: data.products,
                pageInfoDetail: data.pageInfo,
              },
            });
          } catch (error) {
            console.error(error);
            dispatch({ type: "LOADING_FALSE" });
          }
        }
      },
      { threshold: 1 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, endCursor]);

  return {
    productLists: state.productLists,
    loading: state.loading,
    pageInfoDetail: state.pageInfoDetail,
    ref: elementRef
  }
};
