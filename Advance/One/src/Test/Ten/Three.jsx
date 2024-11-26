import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the reusable component

const Three = () => {
  const [data, setData] = useState([1, 2, 3]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleConfirmFetch = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response);
      setData([21, 22, 23, 24]);
    } catch (error) {
      console.error(error);
    } finally {
      setDialogOpen(false); // Close dialog after fetching
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

      {/* Use the reusable ConfirmationDialog */}
      <ConfirmationDialog
        open={dialogOpen}
        title="Confirm Action"
        message="This will overwrite the current data. Proceed?"
        onConfirm={handleConfirmFetch}
        onCancel={handleCloseDialog}
      />
    </>
  );
};

export default Three;
