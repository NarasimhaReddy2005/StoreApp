import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  errorMessage?: string;
}

export default function CheckoutFailure() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const errorMessage =
    state?.errorMessage ??
    "Your payment was not completed. Please try again or choose a different payment method.";

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
      <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant="h4" gutterBottom>
        Payment Failed
      </Typography>

      <Typography sx={{ mb: 4 }}>{errorMessage}</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate("/checkout")}>
          Try Again
        </Button>

        <Button variant="outlined" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    </Box>
  );
}
