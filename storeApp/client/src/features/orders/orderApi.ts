import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import type { CreateOrder, Order } from "../../app/Models/order";

export const orderApi = createApi({ 
    reducerPath: "orderApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: () => 'orders'
        }),
        fetchOrderDetailed: builder.query<Order, number>({
            query: (orderId) => `orders/${orderId}`
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: 'orders',
                method: 'POST',
                body: order
            })
        })
    })
})

export const { 
    useFetchOrdersQuery,
    useFetchOrderDetailedQuery,
    useCreateOrderMutation
} = orderApi;