import { useEffect, useState } from "react";
import AccessoriesDropdown from "../components/DropDown/DropDown";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import MobileCard from "../components/Card/Card";
import DeviceTable from "../components/DevicesTable/DevicesTable";
import EditDialog from "../components/EditDialog/EditDialog";
import DialogCard from "../components/Dialog/Dialog";

const fields = [
  { name: "name", label: "Accessory Name" },
  { name: "image", label: "Image URL" },
  { name: "selectedDevice", label: "Selected Device" },
];

const Accessories = () => {
  const [devices, setDevices] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [createModal, setCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAccessoryId, setSelectedAccessoryId] = useState(null);

  useEffect(() => {
    const fetchDevices = () => {
      const storedDeviceData = localStorage.getItem("myData");
      if (storedDeviceData) {
        try {
          const parsedData = JSON.parse(storedDeviceData);
          if (Array.isArray(parsedData)) {
            setDevices(parsedData);
          } else {
            console.warn("Devices data is not in array format.");
          }
        } catch (error) {
          console.error("Error parsing devices JSON from localStorage:", error);
        }
      } else {
        console.warn("No devices data found in localStorage.");
      }
    };

    const fetchAccessories = () => {
      const storedAccessoriesData = localStorage.getItem("myAccessories");
      if (storedAccessoriesData) {
        try {
          const parsedData = JSON.parse(storedAccessoriesData);
          if (Array.isArray(parsedData)) {
            setAccessoriesData(parsedData);
            setFilteredAccessories(parsedData);
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
    };

    fetchDevices();
    fetchAccessories();
  }, []);

  const handleDeviceSelect = (selectedDevice) => {
    if (selectedDevice) {
      const filtered = accessoriesData.filter((accessory) =>
        accessory.selectedDevice.includes(selectedDevice)
      );
      setFilteredAccessories(filtered);
    } else {
      setFilteredAccessories(accessoriesData);
    }
  };

  const handleUpdate = (newItem) => {
    const updatedAccessories = accessoriesData.map((accessory) =>
      accessory.id === newItem.id ? { ...accessory, ...newItem } : accessory
    );

    // If the item is new (not found), add it
    if (!accessoriesData.some((accessory) => accessory.id === newItem.id)) {
      updatedAccessories.push(newItem);
    }

    // Update state and local storage
    setAccessoriesData(updatedAccessories);
    setFilteredAccessories(updatedAccessories);
    localStorage.setItem("myAccessories", JSON.stringify(updatedAccessories));

    handleCloseModals();
  };

  const handleDelete = () => {
    const updatedAccessories = accessoriesData.filter(
      (accessory) => accessory.id !== selectedAccessoryId
    );

    setAccessoriesData(updatedAccessories);
    setFilteredAccessories(updatedAccessories);
    localStorage.setItem("myAccessories", JSON.stringify(updatedAccessories));
    handleCloseModals();
  };

  const handleEdit = (id) => {
    const itemToEdit = accessoriesData.find((accessory) => accessory.id === id);
    setEditingItem(itemToEdit);
    setCreateModal(true);
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedAccessoryId(id);
    setDeleteModal(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setCreateModal(true);
  };

  const handleCloseModals = () => {
    setCreateModal(false);
    setDeleteModal(false);
    setEditingItem(null);
    setSelectedAccessoryId(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="accessory tabs"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Cards Mode" />
          <Tab label="Table Mode" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <AccessoriesDropdown
            devices={devices}
            onDeviceSelect={handleDeviceSelect}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateModal}
          >
            Add Accessory
          </Button>
        </Box>
      )}

      {tabValue === 0 && (
        <Box
          sx={{
            gap: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          {filteredAccessories.length > 0 ? (
            filteredAccessories.map((accessory) => (
              <MobileCard
                key={accessory.id}
                id={accessory.id}
                name={accessory.name}
                image={accessory.image}
                onDelete={handleOpenDeleteModal}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <Typography variant="body2">No accessories available</Typography>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ marginTop: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <AccessoriesDropdown
              devices={devices}
              onDeviceSelect={handleDeviceSelect}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreateModal}
            >
              Add Accessory
            </Button>
          </Box>

          <DeviceTable
            data={filteredAccessories}
            onEdit={handleEdit}
            onDelete={handleOpenDeleteModal}
          />
        </Box>
      )}

      <EditDialog
        open={createModal}
        handleClose={handleCloseModals}
        item={editingItem}
        handleUpdate={handleUpdate}
        fields={fields}
      />

      <DialogCard
        action="Delete"
        open={deleteModal}
        handleCloseModal={handleCloseModals}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Accessories;
