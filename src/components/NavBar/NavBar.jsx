import React from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useThemeContext } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/authContext"; // Import the custom hook

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const { isAuthenticated, userName } = useAuthContext(); // Destructure auth state and userName

  // Handle opening of the menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing of the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography> */}

        {/* Show User Name if Authenticated */}
        {isAuthenticated && (
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Welcome, {userName}
          </Typography>
        )}

        {/* Dark/Light Mode Switcher */}
        <IconButton color="inherit" onClick={toggleTheme}>
          <Switch />
        </IconButton>

        {/* Notifications Icon with Badge */}
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile Icon */}
        <IconButton edge="end" color="inherit" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>

        {/* Dropdown Menu for Profile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate("/dashboard/profile")}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
