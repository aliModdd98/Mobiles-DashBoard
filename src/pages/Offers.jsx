import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const LOCAL_STORAGE_KEY = "myData";
const ACCESSORIES_STORAGE_KEY = "myAccessories";

// Utility functions for local storage
const getPhoneDatasetFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const savePhoneDatasetToLocalStorage = (dataset) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataset));
};

const Offers = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [currentOffer, setCurrentOffer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newOffer, setNewOffer] = useState({
    device: "",
    accessories: [],
    offerPrice: "",
    offerEndDate: "",
  });
  const [phoneDataset, setPhoneDataset] = useState(
    getPhoneDatasetFromLocalStorage()
  );
  const [myAccessories, setAccessoriesData] = useState([]);

  useEffect(() => {
    // Fetch accessories from local storage
    const storedAccessoriesData = localStorage.getItem(ACCESSORIES_STORAGE_KEY);
    if (storedAccessoriesData) {
      try {
        const parsedData = JSON.parse(storedAccessoriesData);
        if (Array.isArray(parsedData)) {
          setAccessoriesData(parsedData);
        } else {
          console.warn("Accessories data is not in array format.");
        }
      } catch (error) {
        console.error(
          "Error parsing accessories JSON from localStorage:",
          error
        );
      }
    } else {
      console.warn("No accessories data found in localStorage.");
    }
  }, []);

  useEffect(() => {
    // Save dataset to local storage whenever it changes
    savePhoneDatasetToLocalStorage(phoneDataset);
  }, [phoneDataset]);

  useEffect(() => {
    // Update the current offer when the selected device changes
    const selectedPhone = phoneDataset.find(
      (phone) => phone.name === selectedDevice
    );
    setCurrentOffer(selectedPhone ? selectedPhone.offer : null);
  }, [selectedDevice, phoneDataset]);

  const handleDeviceSelect = (deviceName) => {
    setSelectedDevice(deviceName);
  };

  const handleOfferChange = (field, value) => {
    if (!currentOffer) return;

    setCurrentOffer((prevOffer) => ({
      ...prevOffer,
      [field]: value,
    }));
  };

  const handleSaveOffer = () => {
    const updatedDataset = phoneDataset.map((phone) => {
      if (phone.name === selectedDevice) {
        return {
          ...phone,
          offer: currentOffer,
        };
      }
      return phone;
    });

    setPhoneDataset(updatedDataset);
  };

  const handleCreateOffer = () => {
    setOpenDialog(true);
    setNewOffer({
      device: selectedDevice,
      accessories: [],
      offerPrice: "",
      offerEndDate: "",
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNewOfferChange = (field, value) => {
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [field]: value,
    }));
  };

  const handleSaveNewOffer = () => {
    const updatedDataset = phoneDataset.map((phone) => {
      if (phone.name === newOffer.device) {
        return {
          ...phone,
          offer: {
            accessories: newOffer.accessories,
            offerPrice: newOffer.offerPrice,
            offerEndDate: newOffer.offerEndDate,
          },
        };
      }
      return phone;
    });

    if (!updatedDataset.some((phone) => phone.name === newOffer.device)) {
      // Device not found in dataset, add it with the new offer
      const newPhoneData = {
        name: newOffer.device,
        offer: {
          accessories: newOffer.accessories,
          offerPrice: newOffer.offerPrice,
          offerEndDate: newOffer.offerEndDate,
        },
      };
      updatedDataset.push(newPhoneData);
    }

    setPhoneDataset(updatedDataset);
    setOpenDialog(false);
  };

  const handleDeleteOffer = (deviceName) => {
    const updatedDataset = phoneDataset.map((phone) => {
      if (phone.name === deviceName) {
        const { offer, ...phoneWithoutOffer } = phone;
        return phoneWithoutOffer;
      }
      return phone;
    });

    setPhoneDataset(updatedDataset);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Device Offers
      </Typography>

      {/* Dropdown to select a device */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="device-select-label">Select Device</InputLabel>
        <Select
          labelId="device-select-label"
          id="device-select"
          value={selectedDevice}
          onChange={(e) => handleDeviceSelect(e.target.value)}
          label="Select Device"
        >
          {phoneDataset.map((device) => (
            <MenuItem key={device.id} value={device.name}>
              {device.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display offer details if a device is selected */}
      {selectedDevice && (
        <>
          {currentOffer ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Modify Offer for {selectedDevice}
              </Typography>
              <TextField
                label="Offer Price"
                type="number"
                value={currentOffer.offerPrice}
                onChange={(e) =>
                  handleOfferChange("offerPrice", e.target.value)
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Offer End Date"
                type="date"
                value={currentOffer.offerEndDate}
                onChange={(e) =>
                  handleOfferChange("offerEndDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Accessories
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  id="accessories-select-label"
                  sx={{ backgroundColor: "white", px: 1, zIndex: 1 }}
                >
                  Select Accessories
                </InputLabel>
                <Select
                  labelId="accessories-select-label"
                  id="accessories-select"
                  multiple
                  value={currentOffer.accessories}
                  onChange={(e) =>
                    handleOfferChange("accessories", e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {myAccessories.map((accessory) => (
                    <MenuItem key={accessory.id} value={accessory.name}>
                      <Checkbox
                        checked={currentOffer.accessories.includes(
                          accessory.name
                        )}
                      />
                      <ListItemText primary={accessory.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Align buttons horizontally */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={handleSaveOffer}>
                  Save Offer
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteOffer(selectedDevice)}
                >
                  Delete Offer
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography>No offer found for this device.</Typography>
              <Button
                variant="outlined"
                onClick={handleCreateOffer}
                sx={{ mt: 2 }}
              >
                Create Offer
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Dialog for creating a new offer */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Create a New Offer for {selectedDevice}</DialogTitle>
        <DialogContent>
          {/* Accessories Selection */}
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel
              id="accessories-select-label"
              sx={{ backgroundColor: "white", px: 1, zIndex: 1 }}
            >
              Select Accessories
            </InputLabel>
            <Select
              labelId="accessories-select-label"
              id="accessories-select"
              multiple
              value={newOffer.accessories}
              onChange={(e) =>
                handleNewOfferChange("accessories", e.target.value)
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {myAccessories.map((accessory) => (
                <MenuItem key={accessory.id} value={accessory.name}>
                  <Checkbox
                    checked={newOffer.accessories.includes(accessory.name)}
                  />
                  <ListItemText primary={accessory.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Offer Price"
            type="number"
            value={newOffer.offerPrice}
            onChange={(e) => handleNewOfferChange("offerPrice", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Offer End Date"
            type="date"
            value={newOffer.offerEndDate}
            onChange={(e) =>
              handleNewOfferChange("offerEndDate", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveNewOffer}
            variant="contained"
            color="primary"
          >
            Save Offer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Offers;
