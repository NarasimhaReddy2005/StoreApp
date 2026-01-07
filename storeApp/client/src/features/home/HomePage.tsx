import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `
          url(/images/barna-bartis.jpg)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // 🔒 prevents movement
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      {/* Glass card */}
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 8 },
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(1 0px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          maxWidth: 720,
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          color="white"
          sx={{
            mb: 2,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          Welcome to Storistiq
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.85)",
            mb: 5,
            lineHeight: 1.7,
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
        >
          Discover thoughtfully curated products, built for quality and style.
        </Typography>
        <Button
          component={Link}
          to="/catalog"
          size="large"
          sx={{
            px: 6,
            py: 1.8,
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "999px",
            color: "white",
            backgroundImage: "linear-gradient(to right, #2563eb, #06b6d4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 30px rgba(6,182,212,0.4)",
            },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}
