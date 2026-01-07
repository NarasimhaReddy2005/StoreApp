import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Navbar } from "./Navbar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {
  const { darkMode } = useAppSelector((state) => state.ui);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollRestoration />
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode ? "#121212" : "#ffffff",
        }}
      >
        {isHome ? (
          <Outlet />
        ) : ( 
          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <Outlet />
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
