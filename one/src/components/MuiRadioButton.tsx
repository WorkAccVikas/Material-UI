import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";

const MuiRadioButton = () => {
  const [value1, setValue1] = useState("");

  console.table({ value1 });

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(e.target.value);
  };

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel id="job-experience-group-label">
            Year of Experience
          </FormLabel>

          <RadioGroup
            name="job-experience-group"
            aria-labelledby="job-experience-group-label"
            value={value1}
            onChange={handleChange1}
          >
            <FormControlLabel
              control={<Radio color="success" />}
              label="0-2"
              value="0-2"
            />
            <FormControlLabel control={<Radio />} label="3-5" value="3-5" />
            <FormControlLabel control={<Radio />} label="6-10" value="6-10" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel id="job-experience-group-label">
            Year of Experience
          </FormLabel>

          <RadioGroup
            name="job-experience-group"
            aria-labelledby="job-experience-group-label"
            value={value1}
            onChange={handleChange1}
            row
          >
            <FormControlLabel
              control={<Radio color="secondary" />}
              label="0-2"
              value="0-2"
            />
            <FormControlLabel control={<Radio />} label="3-5" value="3-5" />
            <FormControlLabel control={<Radio />} label="6-10" value="6-10" />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default MuiRadioButton;
