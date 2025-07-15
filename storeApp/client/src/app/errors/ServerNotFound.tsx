import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServerNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="error">
          Server Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We were unable to connect to the server. Please try again later or
          check your network.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
};

export default ServerNotFound;
