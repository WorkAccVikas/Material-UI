import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
  InputAdornment,
} from "@mui/material";
import debounce from "lodash.debounce";
import axios from "axios";
import { token } from "./constant";

const SearchInput2 = ({
  label,
  searchUrl,
  debounceDelay = 500,
  onAddNew, // Callback for when "Add New" is clicked
  setFieldValue, // Formik function to set field value
  name, // Field name in Formik
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Controls the dropdown
  const [noMatch, setNoMatch] = useState(false); // Track if there's no match

  // Debounced function to fetch options based on user input
  const debouncedFetchOptions = useCallback(
    debounce(async (searchText) => {
      setLoading(true);
      try {
        const response = await axios.get(searchUrl, {
          params: { filter: searchText },
          headers: { Authorization: token },
        });

        const results = response.data?.data?.result || [];

        // Format results to match dropdown structure
        const formattedOptions = results.map((item) => ({
          id: item._id,
          title: item.company_name, // Displayed in the list
          rawData: item, // Store the whole item for further use
        }));

        setOptions(formattedOptions);
        setNoMatch(formattedOptions.length === 0); // Update noMatch based on results

        // Open dropdown if there are results or user input
        setAnchorEl(document.getElementById("search-input")); // Open the dropdown
      } catch (error) {
        console.error("Error fetching options", error);
      } finally {
        setLoading(false);
      }
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
      setAnchorEl(document.getElementById("search-input")); // Ensure the dropdown still opens when input is empty
    }
  };

  // Close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle option selection from dropdown
  const handleSelect = (option) => {
    setInputValue(option.title);
    setFieldValue(name, option.id); // Set selected ID in Formik state
    setAnchorEl(null); // Close the dropdown after selection
  };

  // Handle "Add New" action
  const handleAddNew = () => {
    onAddNew(inputValue); // Trigger the add new action
    setAnchorEl(null); // Close the dropdown after adding new
  };

  // Prepare menu items based on state
  const renderMenuItems = () => {
    const menuItems = [];

    if (!inputValue) {
      menuItems.push(
        <MenuItem key="type-to-search" disabled>
          Type to search
        </MenuItem>
      );
    } else if (loading) {
      menuItems.push(
        <MenuItem key="loading" disabled>
          <CircularProgress size={24} />
        </MenuItem>
      );
    } else {
      if (options.length > 0) {
        options.forEach((option) => {
          menuItems.push(
            <MenuItem key={option.id} onClick={() => handleSelect(option)}>
              {option.title}
            </MenuItem>
          );
        });
      } else {
        menuItems.push(
          <MenuItem key="no-results" disabled>
            No results found
          </MenuItem>
        );
        if (inputValue) {
          menuItems.push(
            <MenuItem key="add-new" onClick={handleAddNew}>
              <Button>Add New</Button>
            </MenuItem>
          );
        }
      }
    }

    return menuItems;
  };

  return (
    <div>
      <TextField
        id="search-input"
        label={label}
        value={inputValue}
        variant="standard"
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />
      {/* Dropdown for showing options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300, // Limit height of dropdown
            width: "100%",
          },
        }}
      >
        {renderMenuItems()}
      </Menu>
    </div>
  );
};

export default SearchInput2;
