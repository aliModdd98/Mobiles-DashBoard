import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { useAuthContext } from "../../store/authContext";

const Profile = () => {
  const { isAuthenticated, login, logout, userName, changeUserName } =
    useAuthContext();
  const [newName, setNewName] = useState("");

  // Handle name change
  const handleNameChange = () => {
    if (newName.trim()) {
      changeUserName(newName);
      setNewName("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Profile Page
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        {isAuthenticated ? `Welcome, ${userName}!` : "You are not logged in."}
      </Typography>

      {/* Login/Logout Button */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={isAuthenticated ? logout : login}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </Box>

      {/* Input field for changing the user name */}
      {isAuthenticated && (
        <Box sx={{ textAlign: "center" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="New User Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNameChange}
              sx={{ height: "100%" }} // Ensures the button matches the TextField's height
            >
              Change Name
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
