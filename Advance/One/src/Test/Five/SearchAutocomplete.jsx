import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
} from "@mui/material";
import debounce from "lodash.debounce";
import axios from "axios";
import { token } from "./constant";

const SearchInput = ({
  label,
  searchUrl,
  debounceDelay = 500,
  onAddNew, // Callback for when "Add New" is clicked
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For controlling the dropdown
  const [noMatch, setNoMatch] = useState(false); // Track if there's no match

  // Debounced search function to fetch data
  const debouncedFetchOptions = useCallback(
    debounce(async (searchText) => {
      setLoading(true);
      try {
        const response = await axios.get(searchUrl, {
          params: { filter: searchText },
          headers: {
            Authorization: `${token}`,
          },
        });

        const results = response.data?.data?.result || [];

        // Generic extraction: Map the response to a format usable by the custom dropdown
        const formattedOptions = results.map((item) => ({
          id: item._id,
          title: item.company_name, // This will be displayed in the list
          rawData: item, // Store the entire item in case you need more details later
        }));

        setOptions(formattedOptions);
        setNoMatch(formattedOptions.length === 0);

        // Open dropdown only when results are available
        if (formattedOptions.length > 0 || searchText) {
          setAnchorEl(document.getElementById("search-input")); // Open the dropdown
        } else {
          setAnchorEl(null); // Close dropdown if no results
        }
      } catch (error) {
        console.error("Error fetching options", error);
      }
      setLoading(false);
    }, debounceDelay),
    [debounceDelay, searchUrl]
  );

  // Handle input changes and trigger the debounced search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      debouncedFetchOptions(value);
    } else {
      setAnchorEl(null); // Close the dropdown if input is empty
    }
  };

  // Close the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle option selection
  const handleSelect = (option) => {
    setInputValue(option.title);
    setAnchorEl(null); // Close the dropdown after selection
  };

  // Handle "Add New" action
  const handleAddNew = () => {
    onAddNew(inputValue); // Trigger the add new action
    setAnchorEl(null); // Close the dropdown after adding new
  };

  return (
    <div>
      <TextField
        id="search-input"
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
      />
      {/* Dropdown for showing options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300, // Limit the height of the dropdown
            width: "100%",
          },
        }}
      >
        {/* Loading state */}
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          <>
            {/* Render options */}
            {options.length > 0 ? (
              options.map((option) => (
                <MenuItem key={option.id} onClick={() => handleSelect(option)}>
                  {option.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No results found</MenuItem>
            )}

            {/* Add New button */}
            {noMatch && inputValue && (
              <MenuItem onClick={handleAddNew}>
                <Button>Add New</Button>
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default SearchInput;
