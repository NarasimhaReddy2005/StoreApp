import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/Models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";

export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
        query: () => ({url: 'products'})
    }),
    fetchProductDetails: builder.query<Product, number>({
        query: (productId) => `products/${productId}`
    })
  })
});

export const {useFetchProductDetailsQuery, useFetchProductsQuery} = catalogAPI;