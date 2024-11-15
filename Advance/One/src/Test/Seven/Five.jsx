import data from "./data/data1.json";
import { useState } from "react";
import { Autocomplete, TextField, Checkbox, Box, Stack } from "@mui/material";

const Five = () => {
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

  // Get the number of selected movies excluding "Select All"
  const selectedCount = selectedMovies.filter(
    (movie) => movie._id !== "all"
  ).length;

  return (
    <>
      <Stack gap={1}>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
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
          renderInput={(params) => (
            <TextField {...params} placeholder="Movies" />
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
        {/* Display dynamic message when at least one movie is selected */}
        {selectedCount > 0 && (
          <Box mt={2}>
            <strong>
              {selectedCount} {selectedCount === 1 ? "movie" : "movies"}{" "}
              selected
            </strong>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default Five;

/** DESCRIPTION :
 * - This code implements a checkbox Autocomplete component with a "Select All" option.
 * - It also displays counts the number of selected options */