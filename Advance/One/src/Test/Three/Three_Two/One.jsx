import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../../context/SnackbarContext"; // Import the useSnackbar hook
import { useWorker } from "./hook/useWorker";
import { workerFunction } from "./heavyWorker";

export const HEAVY_ACTION = {
  HEAVY_ACTION1: "HEAVY_ACTION1",
  HEAVY_ACTION2: "HEAVY_ACTION2",
};

const One = () => {
  const [count, setCount] = useState(-1);
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(100);
  const [loading, setLoading] = useState(false); // Loading state
  const [loading1, setLoading1] = useState(false); // Loading state

  const { showSnackbar } = useSnackbar(); // Use snackbar context

  // Use the custom hook to manage the worker
  const { postMessage } = useWorker(
    workerFunction,
    (data) => {
      console.log("data = ", data);
      if (data.type === HEAVY_ACTION.HEAVY_ACTION1) {
        setLoading(false); // Stop loading when worker finishes
        setAge(data.result);
      } else if (data.type === HEAVY_ACTION.HEAVY_ACTION2) {
        setLoading1(false); // Stop loading when worker finishes
        setSalary(data.result);
      } else if (data.type === "ERROR") {
        showSnackbar(data.message); // Show error message using the snackbar
      }
    },
    (error) => {
      setLoading(false); // Stop loading on error
      setLoading1(false); // Stop loading on error
      console.error("Worker error:", error);
      showSnackbar("An unexpected error occurred in the worker.");
    }
  );

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleAgeChange = () => {
    const payload = { data: [1, 2, 3, 4] }; // Modify as needed
    setLoading(true); // Start loading when the worker begins processing
    postMessage({ type: HEAVY_ACTION.HEAVY_ACTION1, payload });
  };
  const handleSalaryChange = () => {
    const payload = { data: [11, 12, 13, 14] }; // Modify as needed
    setLoading1(true); // Start loading when the worker begins processing
    postMessage({ type: HEAVY_ACTION.HEAVY_ACTION2, payload });
  };

  return (
    <>
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography variant="h6">Count: {count}</Typography>
          <Typography variant="h6">Age: {age}</Typography>
          <Typography variant="h6">Salary: {salary}</Typography>
        </Stack>

        <Stack
          direction="row"
          gap={1}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCountIncrement}
          >
            Count
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAgeChange}
            disabled={loading} // Disable button when loading
            startIcon={loading && <CircularProgress size={20} />} // Show spinner inside the button
          >
            {loading ? "Processing Age ..." : "Heavy Calculation Age"}
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={handleSalaryChange}
            disabled={loading1} // Disable button when loading
            startIcon={loading1 && <CircularProgress size={20} />} // Show spinner inside the button
          >
            {loading1 ? "Processing Salary..." : "Heavy Calculation Salary"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default One;
