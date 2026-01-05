import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_SIT

type GetAllProductsParams = {
  page?: number;
  limit?: number;
  cat_id?: string;
  product_type?: string;
  min_price?: number;
  max_price?: number;
  sort?: "newest" | "price_high" | "price_low";
  search?: string;
};
// 
export const marketPlaceApi = createApi({
  reducerPath: "marketPlaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    /** =====================
     *  PRODUCTS ENDPOINTS
     *  ===================== */
    getAllProducts: builder.query<any, GetAllProductsParams>({
      query: ({
        page = 1,
        limit = 10,
        cat_id = "",
        min_price,
        max_price,
        sort,
        search,
      } = {}) => {
        let url = `products?page=${page}&limit=${limit}`;

        if (cat_id) url += `&cat_id=${cat_id}`;
        if (min_price !== undefined) url += `&min_price=${min_price}`;
        if (max_price !== undefined) url += `&max_price=${max_price}`;
        if (sort) url += `&sort=${sort}`;
        if (search && search.trim() !== "")
          url += `&search=${encodeURIComponent(search)}`;

        return url;
      },
    }),

    getProductDocument: builder.query<any, string>({
      query: (documentId) => `document/${documentId}`,
    }),

    getProductImages: builder.query<
      any,
      { merchantId: string; productId: string }
    >({
      query: ({ merchantId, productId }) =>
        `products/${merchantId}/${productId}/images`,
    }),

    getProductDetail: builder.query<any, { merchant_id: string; product_id: string }>({
      query: ({ merchant_id, product_id }) =>
        `products/${merchant_id}/${product_id}`,
    }),

    getRelatedProducts: builder.mutation<
      any,
      { productId: string; productType: string; merchantId: string }
    >({
      query: ({ productId, productType, merchantId }) => ({
        url: "products/related-products",
        method: "POST",
        body: { productId, productType, merchantId },
      }),
    }),

    getProductById: builder.query<any, string | number>({
      query: (id) => `/products/${id}`,
    }),

    /** =====================
     *  CATEGORIES ENDPOINT
     *  ===================== */
    getCategories: builder.query({
      query: () => `products/categories`,
    }),
  }),
});

// Export all hooks
export const {
  useGetAllProductsQuery,
  useGetProductDocumentQuery,
  useGetProductImagesQuery,
  useGetProductDetailQuery,
  useGetRelatedProductsMutation,
  useGetProductByIdQuery,
  useGetCategoriesQuery, // new hook for categories
} = marketPlaceApi;
