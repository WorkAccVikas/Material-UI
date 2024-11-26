import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired, // Ensures `open` is a boolean and mandatory
  title: PropTypes.string.isRequired, // Ensures `title` is a string and mandatory
  message: PropTypes.string.isRequired, // Ensures `message` is a string and mandatory
  onConfirm: PropTypes.func.isRequired, // Ensures `onConfirm` is a function and mandatory
  onCancel: PropTypes.func.isRequired, // Ensures `onCancel` is a function and mandatory
};

export default ConfirmationDialog;
