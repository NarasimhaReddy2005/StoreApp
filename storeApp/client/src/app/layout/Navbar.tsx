import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  darkMode: boolean;
  themeToggle: () => void;
};

export const Navbar = ({ darkMode, themeToggle }: Props) => {
  const colorIt = darkMode ? "#fcb80b" : "#ffffff";
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ color: colorIt }}>
          Bookit
        </Typography>
        <IconButton onClick={themeToggle}>
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
