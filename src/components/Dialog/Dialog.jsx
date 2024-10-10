import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
const DialogCard = ({ action, open, handleCloseModal, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {action} this device? This action
          cann&lsquo;t be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error">
          {action}
        </Button>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogCard.propTypes = {
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default DialogCard;
