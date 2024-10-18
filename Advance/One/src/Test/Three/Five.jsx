import { Button, Stack, Typography, Snackbar, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useWorker } from "./useWorker";
import { workerFunction } from "./heavyWorker2";

const Five = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error message state

  // Use the custom hook to manage the worker
  const { postMessage } = useWorker(
    workerFunction,

    (data) => {
      setLoading(false); // Stop loading when worker finishes
      if (data.type === "HEAVY_CALCULATION_DONE") {
        setCity(data.result);
      } else if (data.type === "ERROR") {
        setErrorMessage(data.message); // Set the error message
      }
    },
    (error) => {
      setLoading(false); // Stop loading on error
      console.error("Worker error:", error);
      setErrorMessage("An unexpected error occurred in the worker.");
    }
  );

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleCityChange = () => {
    // Create a payload object
    const payload = { someData: "data for calculation" }; // Modify as needed
    postMessage({ type: "HEAVY_CALCULATION", payload });
    setLoading(true); // Start loading when the worker begins processing
    // postMessage({ type: "HEAVY_CALCULATION", payload: null }); // for error handling
  };

  // Handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h6">Count: {count}</Typography>
        <Typography variant="h6">City: {city}</Typography>
      </Stack>

      <Stack direction="row" gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCountIncrement}
        >
          Normal Calculation Button
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={handleCityChange}
        >
          Heavy Calculation Button
        </Button> */}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleCityChange}
          disabled={loading} // Disable button when loading
          startIcon={loading && <CircularProgress size={20} />} // Show spinner inside the button
        >
          {loading ? "Processing..." : "Heavy Calculation Button"}
        </Button>
      </Stack>

      {/* Snackbar for displaying error messages */}
      <Snackbar
        open={Boolean(errorMessage)}
        message={errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
};

export default Five;
