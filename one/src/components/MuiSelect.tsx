import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const MuiSelect = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [age, setAge] = useState("");
  //   console.log({ countries });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log(typeof value === "string");
    setCountries(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange2 = (e: SelectChangeEvent<string>) => {
    setAge(e.target.value);
  };

  return (
    <>
      <Stack spacing={4}>
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

        <Box width="250px">
          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select label="age" value={age} onChange={handleChange2} fullWidth>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <div
        style={{
          fontSize: "10px",
        }}
      ></div>
    </>
  );
};

export default MuiSelect;
