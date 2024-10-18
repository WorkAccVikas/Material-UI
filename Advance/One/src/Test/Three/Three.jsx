import { Button, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

// Utility to create a generic worker
const createWorker = (workerFunction) => {
  const blob = new Blob([`(${workerFunction.toString()})()`], {
    type: "application/javascript",
  });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
};

const Three = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");
  const workerRef = useRef(null);

  useEffect(() => {
    // Define the worker logic as a function
    const workerFunction = () => {
      // Listen for messages from the main thread
      self.onmessage = (event) => {
        const { type, payload } = event.data;

        if (type === "HEAVY_CALCULATION") {
          // Simulate heavy computation (5 seconds blocking work)
          const start = Date.now();
          while (Date.now() - start < 5000) {
            // Heavy computation running
          }

          // Post back the result after computation
          //   self.postMessage({ type: "HEAVY_CALCULATION_DONE", result: `Pune - ${payload}` });

          const random = Math.floor(Math.random() * 1000);
          console.log("random", random);
          self.postMessage({
            type: "HEAVY_CALCULATION_DONE",
            result: `Pune ${random}`,
          });
        }
      };
    };

    // Initialize worker
    workerRef.current = createWorker(workerFunction);

    // Cleanup worker on component unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleCountIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleCityChange = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: "HEAVY_CALCULATION",
        payload: "Junnar",
      });

      workerRef.current.onmessage = (event) => {
        const { type, result } = event.data;
        if (type === "HEAVY_CALCULATION_DONE") {
          setCity(result); // Update city after heavy calculation
        }
      };

      workerRef.current.onerror = (error) => {
        console.error("Worker error:", error);
      };
    }
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

export default Three;
