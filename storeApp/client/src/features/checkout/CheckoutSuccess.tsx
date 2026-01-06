import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/Models/order";
import { currencyFormat, getAddressString, getPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state as Order;

  if (!order)
    return (
      <Typography variant="h4" gutterBottom>
        Problem accessing the order
      </Typography>
    );

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thankyou for your interest
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Your order <strong>#{order.id}</strong> will not be processed as this
          is a demo application. Thanks for trying out, and no money has been
          charged for demo since razorpay is still in test mode.
        </Typography>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Order date
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatDate(order.orderDate)}
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Payment
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {getPaymentString(order.paymentSummary)}
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Shipping address
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {getAddressString(order.shippingAddress)}
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Amount:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/orders/${order.id}`}
          >
            View your order
          </Button>
          <Button
            component={Link}
            to="/catalog"
            variant="outlined"
            color="primary"
          >
            Continue shopping
          </Button>
        </Box>
      </>
    </Container>
  );
}
