import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Two = () => {
  const [data, setData] = useState([1, 2, 3]);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmFetch = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response);
      setData([11, 12, 13]);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false); // Close dialog after fetching
    }
  };

  return (
    <>
      <h1>Two</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={handleOpenDialog}
        size="large"
        variant="contained"
        color="primary"
      >
        Fetch Data
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will overwrite the current data. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmFetch}
            color="primary"
            variant="contained"
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Two;
