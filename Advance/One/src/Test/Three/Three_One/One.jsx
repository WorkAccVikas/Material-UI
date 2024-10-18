import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useWorker } from "../useWorker";
import { workerFunction } from "../heavyWorker2";
import { useSnackbar } from "../../../context/SnackbarContext"; // Import the useSnackbar hook

const One = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");
  const [loading, setLoading] = useState(false); // Loading state

  const { showSnackbar } = useSnackbar(); // Use snackbar context

  // Use the custom hook to manage the worker
  const { postMessage } = useWorker(
    workerFunction,
    (data) => {
      setLoading(false); // Stop loading when worker finishes
      if (data.type === "HEAVY_CALCULATION_DONE") {
        setCity(data.result);
      } else if (data.type === "ERROR") {
        showSnackbar(data.message); // Show error message using the snackbar
      }
    },
    (error) => {
      setLoading(false); // Stop loading on error
      console.error("Worker error:", error);
      showSnackbar("An unexpected error occurred in the worker.");
    }
  );

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleCityChange = () => {
    // Create a payload object
    const payload = { someData: "data for calculation" }; // Modify as needed
    setLoading(true); // Start loading when the worker begins processing
    postMessage({ type: "HEAVY_CALCULATION", payload });
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
    </Stack>
  );
};

export default One;
