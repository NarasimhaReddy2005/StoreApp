import { useState } from "react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const themeToggle = () => {
    setDarkMode(!darkMode);
  };

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#ffffff" : "#121212",
      },
    },
  });

  // When dependencies change useEffect will try to sync with external state of API
  // mt => margin-top
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Removes default browser borders */}
      <Navbar themeToggle={themeToggle} darkMode={darkMode} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode ? "#121212" : "#ffffff",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
