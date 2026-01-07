import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShippingAddress } from "../../app/Models/order";

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
}

const initialState: CheckoutState = {
  shippingAddress: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    clearCheckout(state) {
      state.shippingAddress = null;
    },
  },
});

export const { setShippingAddress, clearCheckout } = checkoutSlice.actions;
