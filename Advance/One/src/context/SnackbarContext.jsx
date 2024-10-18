import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";
import { Snackbar } from "@mui/material";

// Create the context
const SnackbarContext = createContext();

// Snackbar provider to wrap the app
export const SnackbarProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackbarMessage(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {/* Snackbar Component */}
      <Snackbar
        open={open}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

// SnackbarProvider.PropTypes = {
//   children :
// }

// Custom hook to use snackbar
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
