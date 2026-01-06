import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation as useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} from "./paymentsApi";
import { basketAPI, useFetchBasketQuery } from "../Basket/basketAPI";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
  useCreateOrderMutation as useCreateStoreOrderMutation,
} from "../orders/orderApi";
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface Props {
  onBack: () => void;
}

export default function PaymentStep({ onBack }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shippingAddress = useAppSelector(
    (state) => state.checkout.shippingAddress
  );

  const { data: basket, isLoading } = useFetchBasketQuery();
  const [createOrder, { isLoading: creatingOrder }] = useCreateRazorpayOrderMutation();
  const [createOrder2] = useCreateStoreOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [clearBasket] = basketAPI.useClearBasketMutation();

  if (isLoading || !basket) {
    return <Typography>Loading payment details...</Typography>;
  }
  if (!shippingAddress) {
    navigate("/checkout/address");
    return;
  }



  const handlePayment = async () => {
    if (!shippingAddress) {
      navigate("/checkout/address");
      return;
    }
    try {
      // 1️⃣ Create order on backend
      const order = await createOrder({
        basketId: basket.basketId,
        address: shippingAddress,
      }).unwrap();

      // 2️⃣ Razorpay options
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, // already in paise
        currency: "INR",
        order_id: order.orderId,
        name: "StoreApp",
        description: "Order Payment",
        handler: async (response) => {
          // 3️⃣ Verify payment (UX only, webhook is authority)
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          // Invalidate basket to force refetch
          dispatch(basketAPI.util.invalidateTags(["Basket"]));

          // create order
          const createOrderModel = async () => {
            const shippingAddress1 = shippingAddress;
            const paymentSummary = {
              rzpPaymentId: response.razorpay_payment_id,
              rzpOrderId: response.razorpay_order_id,
              rzpSignature: response.razorpay_signature,
            };
            const razorpayOrderId = response.razorpay_order_id;
            if (!shippingAddress1 || !paymentSummary || !razorpayOrderId)
              throw new Error("Missing data for order creation");
            return { shippingAddress, paymentSummary, razorpayOrderId };
          };

          const orderModel = await createOrderModel();
          const createdOrder = await createOrder2(orderModel).unwrap();
          clearBasket();

          navigate("/checkout/success", {state: createdOrder});
        },
        modal: {
          ondismiss: () => {
            console.warn("User closed Razorpay modal");

            navigate("/checkout/failure", {
              state: {
                errorMessage: "Payment was cancelled by the user.",
              },
            });
          },
        },
      };

      // 4️⃣ Open Razorpay modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: unknown) {
      let message = "Payment could not be completed. Please try again.";

      if (isFetchBaseQueryError(error)) {
        if (typeof error.status === "number") {
          message = "Payment verification failed. Please try again.";
        } else if (error.status === "FETCH_ERROR") {
          message = "Network error. Please check your connection.";
        }
      } else if (error instanceof Error) {
        console.error("Payment error:", error.message);
      }
      // 3️⃣ Fallback
      else {
        console.error("Unknown payment error", error);
      }

      navigate("/checkout/failure", {
        state: {
          errorMessage: message,
        },
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment details
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={onBack}>Back</Button>

        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={creatingOrder}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
}
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}
