import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";

const DashBoard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* NavBar */}
      <NavBar />

      {/* Main content container */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            bgcolor: "background.default",
            display: "flex",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;
