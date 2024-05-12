import { Box, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

const MuiSelect = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  console.log({ countries });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log(typeof value === "string");
    setCountries(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Box width="250px">
        {/* Single Select */}
        <TextField
          label="Select Country"
          select
          fullWidth
          value={country}
          onChange={handleChange}
        >
          <MenuItem value="IN">India</MenuItem>
          <MenuItem value="PAK">Pakistan</MenuItem>
          <MenuItem value="US">USA</MenuItem>
        </TextField>

        {/* Multiple Select */}
        <TextField
          label="Select Country"
          select
          fullWidth
          value={countries}
          onChange={handleChange1}
          SelectProps={{
            multiple: true,
          }}
        >
          <MenuItem value="IN">India</MenuItem>
          <MenuItem value="PAK">Pakistan</MenuItem>
          <MenuItem value="US">USA</MenuItem>
        </TextField>
      </Box>
    </>
  );
};

export default MuiSelect;
