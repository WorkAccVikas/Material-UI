import { Button, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const Two = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");
  const workerRef = useRef(null);

  useEffect(() => {
    // Create the web worker on component mount
    workerRef.current = new Worker(
      new URL("./heavyWorker.js", import.meta.url)
    );

    // Cleanup the worker on component unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleCountIncrement = () => {
    setCount((p) => p + 1);
  };

  const handleCityChange = () => {
    if (workerRef.current) {
      workerRef.current.postMessage("start");

      workerRef.current.onmessage = (event) => {
        if (event.data === "done") {
          const newCity = "Pune";
          setCity(newCity);
        }
      };
    }
  };

  return (
    <>
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
    </>
  );
};

export default Two;
