import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DeviceTable = ({ data, onEdit, onDelete }) => {
  // Determine which columns to display based on the provided data
  const hasMadeIn = data.some((device) => device.made_in);
  const hasRam = data.some((device) => device.ram);
  const hasStorage = data.some((device) => device.storage);

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
            {hasMadeIn && (
              <TableCell sx={{ fontWeight: "bold" }}>Made In</TableCell>
            )}
            {hasRam && <TableCell sx={{ fontWeight: "bold" }}>RAM</TableCell>}
            {hasStorage && (
              <TableCell sx={{ fontWeight: "bold" }}>Storage</TableCell>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                <img
                  src={device.image}
                  alt={device.name}
                  style={{ width: 100, height: "auto" }}
                />
              </TableCell>
              {hasMadeIn && <TableCell>{device.made_in}</TableCell>}
              {hasRam && <TableCell>{device.ram}</TableCell>}
              {hasStorage && <TableCell>{device.storage}</TableCell>}
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(device.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(device.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Define prop types for DeviceTable
DeviceTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      made_in: PropTypes.string,
      ram: PropTypes.string,
      storage: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeviceTable;
