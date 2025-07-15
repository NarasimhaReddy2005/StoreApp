import { Typography, Box, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

export default function EmptyBasket() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      textAlign="center"
      gap={2}
    >
      <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: "grey.500" }} />
      <Typography variant="h4" color="textSecondary">
        Your basket is empty
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Looks like you haven't added anything yet.
      </Typography>
      <Button
        component={Link}
        to="/catalog"
        variant="contained"
        color="primary"
        href="/products"
      >
        Start Shopping
      </Button>
    </Box>
  );
}
