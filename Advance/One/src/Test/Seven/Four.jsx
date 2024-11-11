import data from "./data/data1.json";
import { useState } from "react";
import { Autocomplete, TextField, Checkbox, Box } from "@mui/material";

const Four = () => {
  // State to hold the selected values
  const [selectedMovies, setSelectedMovies] = useState([]);

  // Add the "Select All" option to the list of options
  const options = [{ _id: "all", label: "Select All" }, ...data];

  // Handle change in selection
  const handleChange = (event, newValue) => {
    // If "Select All" is selected
    if (newValue.some((item) => item._id === "all")) {
      // If "Select All" is selected, select all movies if not already selected
      if (selectedMovies.length !== data.length) {
        setSelectedMovies(data); // Select all movies
      } else {
        // Deselect all if "Select All" is clicked again
        setSelectedMovies([]); // Deselect all
      }
    } else {
      // Update the selection without "Select All"
      setSelectedMovies(newValue);
    }
  };

  // Check if all items are selected (excluding "Select All")
  const isAllSelected = selectedMovies.length === data.length;

  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        limitTags={2}
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onChange={handleChange} // Set the onChange handler
        value={selectedMovies} // Set the current value of the Autocomplete
        renderOption={(props, option, { selected }) => {
          const { key, ...restProps } = props; // Extract key from props
          return (
            <li key={key} {...restProps}>
              {" "}
              {/* Apply key directly */}
              <Checkbox
                style={{ marginRight: 8 }}
                checked={option._id === "all" ? isAllSelected : selected}
              />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} placeholder="Movies" />}
        popperProps={{
          disableInteractive: true, // Disable interactive popper to hide dropdown
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            p: 1,
          },
          "& .MuiAutocomplete-endAdornment": {
            display: "none", // Hide the dropdown arrow
          },
          "& .MuiAutocomplete-tag": {
            bgcolor: "primary.lighter",
            border: "1px solid",
            borderRadius: 1,
            height: 32,
            pl: 1.5,
            pr: 1.5,
            lineHeight: "32px",
            borderColor: "primary.light",
            "& .MuiChip-label": {
              paddingLeft: 0,
              paddingRight: 0,
            },
            "& .MuiSvgIcon-root": {
              color: "primary.main",
              ml: 1,
              mr: -0.75,
              "&:hover": {
                color: "primary.dark",
              },
            },
          },
        }}
      />

      {/* Display selected values */}
      <Box mt={2}>
        <strong>Selected Movies:</strong>
        <ul>
          {selectedMovies
            .filter((movie) => movie._id !== "all") // Exclude "Select All" from the list
            .map((movie) => (
              <li key={movie._id}>{movie.label}</li>
            ))}
        </ul>
      </Box>
    </>
  );
};

export default Four;

/** DESCRIPTION :
 * - This code implements a checkbox Autocomplete component with a "Select All" option. 
 * - It also displays limits the number of selected options to 2.
 * - Hide Arrow icon in dropdown */
