import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useRef } from "react";

export default function NoResults() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll into view when this component is mounted
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        py: 6,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, mb: 2, color: "error.main" }} />
      <Typography variant="h6" fontWeight={600}>
        No Results Found
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, maxWidth: 400 }}>
        There are no products matching your filters. Try adjusting your search
        or removing some filters.
      </Typography>
    </Box>
  );
}
