import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const midlinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];
const rightlinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

type Props = {
  darkMode: boolean;
  themeToggle: () => void;
};

export const Navbar = ({ darkMode, themeToggle }: Props) => {
  const colorIt = darkMode ? "#fcb80b" : "#ffffff";
  const optHover = darkMode ? "#bdb742" : "grey.500";
  const optActiv = darkMode ? "#99f50a" : "#f3f619";
  const navStyles = {
    color: "inherit",
    typography: "h7",
    textDecoration: "none",
    "&:hover": {
      color: optHover,
    },
    "&.active": {
      color: optActiv,
    },
  };
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{ color: colorIt, textDecoration: "none" }}
          >
            Storistiq
          </Typography>
          <IconButton onClick={themeToggle}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>
        <List sx={{ display: "flex" }}>
          {midlinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles} // inherits from parent
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightlinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles} // inherits from parent
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
