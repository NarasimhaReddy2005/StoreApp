import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant="h4" gutterBottom>
        Payment Successful
      </Typography>

      <Typography sx={{ mb: 4 }}>
        Thank you for your order. Your payment has been received and your order
        is being processed.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
}
