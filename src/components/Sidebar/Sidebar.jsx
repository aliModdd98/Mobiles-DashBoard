import React from "react";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DevicesIcon from "@mui/icons-material/Devices";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Dashboard } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const sections = [
  { label: "Home", path: "home", icon: <HomeIcon /> },
  { label: "Devices", path: "devices", icon: <DevicesIcon /> },
  { label: "Accessories", path: "accessories", icon: <StoreIcon /> },
  { label: "Offers", path: "offers", icon: <LocalOfferIcon /> },
];

const Sidebar = () => {
  const isSmallScreen = useMediaQuery("(max-width: 560px)");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <>
      {/* Dashboard Phrase */}
      <Typography
        variant="h6"
        component="div"
        sx={{
          p: 2,
          marginTop: 5,
          textAlign: "center",
          color: "text.primary", // Use theme color for text
          fontWeight: "bold",
        }}
      >
        <Dashboard style={{ color: "#ff6500", width: 25 }} /> Dashboard for
        Mobiles Company
      </Typography>

      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          alignItems: "center",
          color: "primary.main",
        }}
      >
        {sections.map((section) => (
          <NavLink
            key={section.label}
            to={section.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              width: "100%",
              color: isActive ? "white" : "#ff6500",
              backgroundColor: isActive ? "#ff6500" : "transparent",
              display: "flex",
              borderRadius: 6,
              alignItems: "center",
              transition: "color 0.3s, background-color 0.3s",
            })}
            onClick={toggleDrawer}
          >
            <ListItem
              button
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                color: "inherit",
                "&:hover": {
                  bgcolor: "rgba(255, 105, 0, 0.2)",
                },
                transition: "color 0.3s, background-color 0.3s",
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 0, mb: 0.5 }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText
                primary={section.label}
                sx={{ textAlign: "center", m: 0, p: 0 }}
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              left: 0,
              top: "95%",
              transform: "translateY(-50%)",
              zIndex: 1201,
              bgcolor: "white",
              border: "1px solid #ddd",
              borderRadius: "50%",
              boxShadow: 1,
              backgroundColor: "#ff6500",
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                bgcolor: "navbar.background",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {drawerContent}
          </SwipeableDrawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              bgcolor: "navbar.background",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
