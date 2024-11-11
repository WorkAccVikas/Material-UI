import data from "./data/data1.json";
import { useState } from "react";
import { Autocomplete, TextField, Checkbox, Box } from "@mui/material";

const One = () => {
  // State to hold the selected values
  const [selectedMovies, setSelectedMovies] = useState([]);

  // Handle change in selection
  const handleChange = (event, newValue) => {
    setSelectedMovies(newValue); // Update state with the new selected values
  };

  return (
    <Box>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={data}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onChange={handleChange} // Set the onChange handler
        value={selectedMovies} // Set the current value of the Autocomplete
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} placeholder="Checkboxes" />
        )}
        sx={{
          "& .MuiOutlinedInput-root": {
            p: 1,
          },
          "& .MuiAutocomplete-tag": {
            bgcolor: "primary.lighter",
            border: "1px solid",
            borderColor: "primary.light",
            "& .MuiSvgIcon-root": {
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default One;
