import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetAllProductsParams = {
  page?: number;
  limit?: number;
  product_type?: string;
  min_price?: number;
  max_price?: number;
  sort?: "newest" | "price_high" | "price_low";
  search?: string;
};

export const marketPlaceApi = createApi({
  reducerPath: "marketPlaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-mob-sit.tamweel-aloula.com/market-place/v1",
  }),
  endpoints: (builder) => ({
    // Get all marketplace products with filters
    getAllProducts: builder.query<any, GetAllProductsParams>({
      query: ({
        page = 1,
        limit = 10,
        product_type = "",
        min_price,
        max_price,
        sort,
        search, // ✅ Added search param
      } = {}) => {
        let url = `products?page=${page}&limit=${limit}`;

        if (product_type) url += `&product_type=${product_type}`;
        if (min_price !== undefined) url += `&min_price=${min_price}`;
        if (max_price !== undefined) url += `&max_price=${max_price}`;
        if (sort) url += `&sort=${sort}`;
        if (search && search.trim() !== "")
          url += `&search=${encodeURIComponent(search)}`; // ✅ Added safe encoding

        return url;
      },
    }),

    // Get product document by ID
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
    getProductDetail: builder.query({
      query: ({ merchant_id, product_id }) =>
        `products/${merchant_id}/${product_id}`,
    }),
    getRelatedProducts: builder.mutation({
      query: ({ productId, productType, merchantId }) => ({
        url: "products/related-products",
        method: "POST",
        body: { productId, productType, merchantId },
      }),
    }),
    getProductById: builder.query({
      query: (id: string | number) => `/products/${id}`,
    }),
  }),
});

// Export hooks
export const {
  useGetAllProductsQuery,
  useGetProductDocumentQuery,
  useGetProductImagesQuery,
  useGetProductDetailQuery,
  useGetRelatedProductsMutation,
  useGetProductByIdQuery,
} = marketPlaceApi;
