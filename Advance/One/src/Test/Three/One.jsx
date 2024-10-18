import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const heavyCalculation = () => {
  // Simulate a heavy calculation that blocks the UI thread
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // This loop will run for 5 seconds, blocking the UI thread
  }
};


const One = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Mumbai");

  const handleCountIncrement = () => {
    console.log("Normal calculation button clicked");
    setCount((p) => p + 1);
  };

  const handleCityChange = () => {
    // Perform heavy calculation
    heavyCalculation();

    const newCity = "Pune";
    setCity(newCity);
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
          <Button variant="contained" color="secondary" onClick={handleCityChange}>
            Heavy Calculation Button
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default One;
