import { Box, Typography, Divider, Button } from "@mui/material";
import { useFetchBasketQuery } from "../../features/Basket/basketAPI";
import { useAppSelector } from "../../app/store/store";
import type { Item } from "../../app/Models/basket";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewOrder({ onNext, onBack }: Props) {
  const address = useAppSelector((state) => state.checkout.shippingAddress);

  const { data: basket, isLoading } = useFetchBasketQuery();

  if (!address) {
    return (
      <Typography color="error">
        Shipping address not found. Please go back and enter address.
      </Typography>
    );
  }

  if (isLoading) {
    return <Typography>Loading basket...</Typography>;
  }

  if (!basket || basket.items.length === 0) {
    return <Typography color="error">Your basket is empty.</Typography>;
  }

  const subtotal = basket.items.reduce(
    (sum: number, item: Item) => sum + (item.price * item.quantity) / 100,
    0
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review your order
      </Typography>

      {/* Shipping Address */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Shipping address
        </Typography>

        <Typography>{address.name}</Typography>
        <Typography>{address.line1}</Typography>
        {address.line2 && <Typography>{address.line2}</Typography>}
        <Typography>
          {address.city}, {address.state} {address.postal_code}
        </Typography>
        <Typography>{address.country}</Typography>
      </Box>

      <Divider />

      {/* Order Items */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Order items
        </Typography>

        {basket.items.map((item: Item) => (
          <Box
            key={item.productId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            <Box>
              <Typography>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.brand} · {item.type}
              </Typography>
            </Box>

            <Typography>
              ${item.price / 100} x {item.quantity}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <Typography>Total</Typography>
        <Typography>${subtotal}</Typography>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Button onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={onNext}>
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
}
