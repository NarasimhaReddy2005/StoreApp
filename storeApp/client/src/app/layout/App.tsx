import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {
  const {darkMode} = useAppSelector((state) => state.ui);
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
      <Navbar/>
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
