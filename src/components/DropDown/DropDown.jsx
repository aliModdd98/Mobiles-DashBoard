import { useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const AccessoriesDropdown = ({ devices, onDeviceSelect }) => {
  const [selectedAccessory, setSelectedAccessory] = useState("");

  const handleChange = (event) => {
    const selectedDevice = event.target.value;
    setSelectedAccessory(selectedDevice);
    onDeviceSelect(selectedDevice);
  };

  return (
    <FormControl
      sx={{
        width: "100%",
        maxWidth: 350,
      }}
    >
      <InputLabel
        id="accessories-select-label"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          maxWidth: "350px",
          padding: "0 0.5rem",
          color: "black",
        }}
        shrink
      >
        Select Accessory For
      </InputLabel>
      <Select
        labelId="accessories-select-label"
        id="accessories-select"
        value={selectedAccessory}
        onChange={handleChange}
        sx={{
          width: "100%", // Full width relative to FormControl
          maxWidth: 350, // Max width is 350px
        }}
        renderValue={(selected) => {
          const selectedAccessory = devices?.find(
            (accessory) => accessory.name === selected
          );
          return (
            <>
              <Typography variant="body1">
                {selectedAccessory?.name || "Select Accessory For"}
              </Typography>
            </>
          );
        }}
      >
        {devices?.map((device) => (
          <MenuItem key={device.id} value={device.name}>
            <img
              src={device.image}
              alt={device.name}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            {device.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

AccessoriesDropdown.propTypes = {
  devices: PropTypes.array.isRequired,
  onDeviceSelect: PropTypes.func.isRequired,
};

export default AccessoriesDropdown;
