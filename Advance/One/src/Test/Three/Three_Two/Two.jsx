import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useWorker } from "./hook/useWorker1";
import { workerFunction } from "./heavyWorker";

export const HEAVY_ACTION = {
  HEAVY_ACTION1: "HEAVY_ACTION1",
  HEAVY_ACTION2: "HEAVY_ACTION2",
};

const One = () => {
  const [count, setCount] = useState(-1);
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(100);
  const [loadingAge, setLoadingAge] = useState(false); // Loading state for Age worker
  const [loadingSalary, setLoadingSalary] = useState(false); // Loading state for Salary worker

  const { showSnackbar } = useSnackbar();

  // Hook for managing Age worker
  const { postMessage: postAgeMessage } = useWorker(
    workerFunction,
    (data) => {
      if (data.type === HEAVY_ACTION.HEAVY_ACTION1) {
        setLoadingAge(false);
        setAge(data.result);
      } else if (data.type === "ERROR") {
        setLoadingAge(false);
        showSnackbar(data.message);
      }
    },
    (error) => {
      setLoadingAge(false);
      console.error("Age Worker error:", error);
      showSnackbar("An error occurred in the Age worker.");
    }
  );

  // Hook for managing Salary worker
  const { postMessage: postSalaryMessage } = useWorker(
    workerFunction,
    (data) => {
      if (data.type === HEAVY_ACTION.HEAVY_ACTION2) {
        setLoadingSalary(false);
        setSalary(data.result);
      } else if (data.type === "ERROR") {
        setLoadingSalary(false);
        showSnackbar(data.message);
      }
    },
    (error) => {
      setLoadingSalary(false);
      console.error("Salary Worker error:", error);
      showSnackbar("An error occurred in the Salary worker.");
    }
  );

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleAgeChange = () => {
    const payload = { data: [1, 2, 3, 4] }; // Mock data for age
    setLoadingAge(true);
    postAgeMessage({ type: HEAVY_ACTION.HEAVY_ACTION1, payload });
  };

  const handleSalaryChange = () => {
    const payload = { data: [11, 12, 13, 14] }; // Mock data for salary
    setLoadingSalary(true);
    postSalaryMessage({ type: HEAVY_ACTION.HEAVY_ACTION2, payload });
  };

  return (
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
          disabled={loadingAge} // Disable button when Age worker is running
          startIcon={loadingAge && <CircularProgress size={20} />} // Show spinner when Age worker is running
        >
          {loadingAge ? "Processing Age ..." : "Heavy Calculation Age"}
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={handleSalaryChange}
          disabled={loadingSalary} // Disable button when Salary worker is running
          startIcon={loadingSalary && <CircularProgress size={20} />} // Show spinner when Salary worker is running
        >
          {loadingSalary ? "Processing Salary..." : "Heavy Calculation Salary"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default One;
