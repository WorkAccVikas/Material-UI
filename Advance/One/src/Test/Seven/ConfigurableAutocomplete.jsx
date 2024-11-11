import PropTypes from "prop-types";
import { useState } from "react";
import { Autocomplete, TextField, Checkbox, Box, Stack } from "@mui/material";

const ConfigurableAutocomplete = ({
  id = "configurable-autocomplete",
  options = [], // List of options to display
  label = "Movies", // Label for the autocomplete
  placeholder = "Select Movies", // Placeholder for the input field
  getOptionLabel = (option) => option.label, // Function to get the label for each option
  onChange, // Callback function when the selection changes
  filterSelectedOptions = false, // Filter selected options
  value = [], // Initial selected values
  selectAllLabel = "Select All", // Label for the "Select All" option
  hideSelectAll = false, // Hide the "Select All" option
  sx = {}, // Custom styles to override default styles
  ...props
}) => {
  console.log("props", props);
  const [selectedMovies, setSelectedMovies] = useState(value);

  // // Add the "Select All" option to the list of options
  // const optionsWithSelectAll = [
  //   { _id: "all", label: selectAllLabel },
  //   ...options,
  // ];

  const optionsWithSelectAll = hideSelectAll
    ? options
    : [{ _id: "all", label: selectAllLabel }, ...options];

  // Handle change in selection
  const handleChange = (event, newValue) => {
    console.log(`🚀 ~ handleChange ~ newValue:`, newValue);
    // If "Select All" is selected
    if (newValue.some((item) => item._id === "all")) {
      // If "Select All" is selected, select all items if not already selected
      if (selectedMovies.length !== options.length) {
        console.log("One");
        setSelectedMovies(options); // Select all items
        // Call the onChange prop with the new selection
        if (onChange) onChange(options);
      } else {
        console.log("Two");
        // Deselect all if "Select All" is clicked again
        setSelectedMovies([]); // Deselect all
        // Call the onChange prop with the new selection
        if (onChange) onChange([]);
      }
    } else {
      console.log("Three");
      // Update the selection without "Select All"
      setSelectedMovies(newValue);
      // Call the onChange prop with the new selection
      if (onChange) onChange(newValue);
    }
  };

  // Check if all items are selected (excluding "Select All")
  const isAllSelected = selectedMovies.length === options.length;

  // Get the number of selected items excluding "Select All"
  const selectedCount = selectedMovies.filter(
    (movie) => movie._id !== "all"
  ).length;

  return (
    <Stack gap={1}>
      <Autocomplete
        multiple
        id={id}
        filterSelectedOptions={filterSelectedOptions}
        options={optionsWithSelectAll}
        getOptionLabel={getOptionLabel}
        onChange={handleChange} // Set the onChange handler
        value={selectedMovies} // Set the current value of the Autocomplete
        renderOption={(props, option, { selected }) => {
          const { key, ...restProps } = props; // Extract key from props
          return (
            <li key={key} {...restProps}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={option._id === "all" ? isAllSelected : selected}
              />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
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
          ...sx, // Merge custom styles
        }}
        {...props}
      />
      {/* Display dynamic message when at least one item is selected */}
      {selectedCount > 0 && (
        <Box mt={2}>
          <strong>
            {selectedCount} {selectedCount === 1 ? "movie" : "movies"} selected
          </strong>
        </Box>
      )}
    </Stack>
  );
};

ConfigurableAutocomplete.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array, // List of options to display
  label: PropTypes.string, // Label for the autocomplete
  placeholder: PropTypes.string, // Placeholder for the input field
  getOptionLabel: PropTypes.func, // Function to get the label for each option
  onChange: PropTypes.func, // Callback function when the selection changes
  filterSelectedOptions: PropTypes.bool, // Filter selected options
  value: PropTypes.array, // Initial selected values
  selectAllLabel: PropTypes.string, // Label for the "Select All" option
  hideSelectAll: PropTypes.bool, // Hide the "Select All" option
  sx: PropTypes.object, // Custom styles to override default styles
};

export default ConfigurableAutocomplete;
