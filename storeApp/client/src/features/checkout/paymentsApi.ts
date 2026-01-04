import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import type { Address } from "../../app/Models/address";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    // paymentsApi.ts
    createOrder: builder.mutation<
      { orderId: string; amount: number; status: string },
      { basketId: string; address: Address }
    >({
      query: (body) => ({
        url: "payments/create-rzp-order",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.mutation<
      void,
      {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }
    >({
      query: (body) => ({
        url: "payments/verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = paymentsApi;
