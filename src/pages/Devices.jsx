import { Box, Tab, Tabs, Button } from "@mui/material";
import MobileCard from "../components/Card/Card";
import { useEffect, useState } from "react";
import DeviceTable from "../components/DevicesTable/DevicesTable";
import DialogCard from "../components/Dialog/Dialog";
import EditDialog from "../components/EditDialog/EditDialog";

const deviceFields = [
  { name: "name", label: "Name" },
  { name: "image", label: "Image URL" },
  { name: "made_in", label: "Made In" },
  { name: "ram", label: "RAM" },
  { name: "storage", label: "Storage" },
];

const Devices = () => {
  const [tabValue, setTabValue] = useState(0);
  const [phoneDataset, setPhoneDataset] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setPhoneDataset(parsedData);
        } else {
          console.warn("Data is not in array format.");
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    } else {
      console.warn("No data found in localStorage.");
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDeleteModal = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedDataset = phoneDataset.filter(
      (device) => device.id !== selectedDeviceId
    );
    setPhoneDataset(updatedDataset);
    localStorage.setItem("myData", JSON.stringify(updatedDataset));
    handleCloseModals();
  };

  const handleOpenEditModal = (deviceId) => {
    const device = phoneDataset.find((device) => device.id === deviceId);
    setSelectedDevice(device);
    setOpenEditModal(true);
  };

  const handleUpdate = (updatedDevice) => {
    const updatedDataset = phoneDataset.map((device) =>
      device.id === updatedDevice.id ? { ...device, ...updatedDevice } : device
    );
    setPhoneDataset(updatedDataset);
    localStorage.setItem("myData", JSON.stringify(updatedDataset));
    handleCloseModals();
  };

  const handleAddDevice = (newDevice) => {
    console.log("Adding new device:", newDevice);
    const updatedDataset = [...phoneDataset, newDevice];
    setPhoneDataset(updatedDataset);
    localStorage.setItem("myData", JSON.stringify(updatedDataset));
    handleCloseModals();
  };

  const handleCloseModals = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setOpenAddModal(false);
    setSelectedDevice(null);
    setSelectedDeviceId(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="device tabs"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Cards" />
          <Tab label="Table" />
        </Tabs>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
        >
          Add Device
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        {tabValue === 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {phoneDataset.map((device) => (
              <MobileCard
                key={device.id}
                id={device.id}
                name={device.name}
                image={device.image}
                madeIn={device.made_in}
                ram={device.ram}
                storage={device.storage}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </Box>
        )}
        {tabValue === 1 && (
          <DeviceTable
            data={phoneDataset}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </Box>
      <DialogCard
        action="Delete"
        open={openDeleteModal}
        handleCloseModal={handleCloseModals}
        handleDelete={handleDelete}
      />
      <EditDialog
        open={openEditModal}
        handleClose={handleCloseModals}
        item={selectedDevice}
        handleUpdate={handleUpdate}
        fields={deviceFields}
      />
      <EditDialog
        open={openAddModal}
        handleClose={handleCloseModals}
        handleUpdate={handleAddDevice}
        fields={deviceFields}
      />
    </Box>
  );
};

export default Devices;
