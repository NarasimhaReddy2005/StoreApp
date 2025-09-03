import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/Models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import type { ProductParams } from "../../app/Models/productParams";
import { filterEmptyValues } from "../../lib/util";
import type { Pagination } from "../../app/Models/pagination";

export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<
      { items: Product[]; pagination: Pagination },
      ProductParams
    >({
      query: (productParams) => {
        return { url: "products", params: filterEmptyValues(productParams) };
      },
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get('Pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader):null;
        return {items, pagination};
      }
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),
    fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => "products/filters",
    }),
  }),
});

export const {
  useFetchProductDetailsQuery,
  useFetchProductsQuery,
  useFetchFiltersQuery,
} = catalogAPI;
