import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useWorker } from "./useWorker";
import { workerFunction } from "./heavyWorker2";

const Four = () => {
  console.log("Four rendered");

  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");

  // Use the custom hook to manage the worker
  const { postMessage } = useWorker(
    workerFunction,
    (data) => {
      if (data.type === "HEAVY_CALCULATION_DONE") {
        setCity(data.result);
      }
    },
    (error) => {
      console.error("Worker error:", error);
    }
  );

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleCityChange = () => {
    // postMessage({ type: "HEAVY_CALCULATION" });
    // Create a payload object
    const payload = { someData: "data for calculation" }; // Modify as needed
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
        >
          Heavy Calculation Button
        </Button>
      </Stack>
    </Stack>
  );
};

export default Four;

// https://chatgpt.com/share/671140a2-491c-800f-b285-c6b99a062f4e
