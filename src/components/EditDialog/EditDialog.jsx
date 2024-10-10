import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, useEffect, memo } from "react";

const EditDialog = ({ open, handleClose, item, handleUpdate, fields }) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      initialData[field.name] = item ? item[field.name] || "" : "";
    });
    return initialData;
  });

  useEffect(() => {
    if (item) {
      const updatedFormData = fields.reduce((acc, field) => {
        acc[field.name] = item[field.name] || "";
        return acc;
      }, {});
      setFormData(updatedFormData);
    } else {
      setFormData(
        fields.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {})
      );
    }
  }, [item, fields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return fields.every((field) => {
      const value = formData[field.name];

      // Check if the value is a string and not empty after trimming
      if (typeof value === "string") {
        return value.trim() !== "";
      }

      // If the field is an array (like selectedDevice), ensure it has at least one item
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      // Handle other types as needed, assuming they should not be empty or null
      return value !== null && value !== undefined;
    });
  };

  const handleSubmit = () => {
    console.log("FormData:", formData);

    if (isFormValid()) {
      const newItem = item
        ? { ...item, ...formData }
        : { id: Date.now(), ...formData }; // Create a new item with a unique ID

      console.log("Submitting new item:", newItem);
      handleUpdate(newItem); // Ensure this is only called once
      handleClose();
      alert("Operation has been successfully completed!");
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{item ? "Edit Item" : "Add Item"}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <TextField
            key={field.name}
            margin="dense"
            label={field.label}
            name={field.name}
            fullWidth
            value={formData[field.name]}
            onChange={handleInputChange}
            required
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {item ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleUpdate: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(EditDialog);
