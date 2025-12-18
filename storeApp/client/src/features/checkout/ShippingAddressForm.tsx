import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setShippingAddress } from "./checkoutSlice";
import type { Address as ShippingAddress } from "../../app/Models/address";

interface Props {
  onNext: () => void;
}

export default function ShippingAddressForm({ onNext }: Props) {
  const dispatch = useAppDispatch();

  // 👇 Read existing address from Redux
  const existingAddress = useAppSelector(
    (state) => state.checkout.shippingAddress
  );

  const [form, setForm] = useState<ShippingAddress>(
    existingAddress ?? {
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "IN",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    form.name &&
    form.line1 &&
    form.city &&
    form.state &&
    form.postal_code &&
    form.country;

  const handleSubmit = () => {
    if (!isValid) return;
    dispatch(setShippingAddress(form));
    onNext();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Address Line 1"
          name="line1"
          value={form.line1}
          onChange={handleChange}
          sx={{ gridColumn: "1 / -1" }}
        />
        <TextField
          label="Address Line 2"
          name="line2"
          value={form.line2}
          onChange={handleChange}
          sx={{ gridColumn: "1 / -1" }}
        />
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <TextField
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
        />
        <TextField
          label="Postal Code"
          name="postal_code"
          value={form.postal_code}
          onChange={handleChange}
        />
        <TextField
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
      </Box>

      <Button
        sx={{ mt: 3 }}
        variant="contained"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Next
      </Button>
    </Box>
  );
}
