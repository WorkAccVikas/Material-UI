import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  TextField,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
  InputAdornment,
  ClickAwayListener,
  Paper,
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
  const [open, setOpen] = useState(false); // Controls the dropdown
  const inputRef = useRef(null); // Reference to the input element

  // Debounced function to fetch options based on user input
  const fetchOptions = useCallback(
    debounce(async (searchText) => {
      console.log(`🚀 ~ debounce ~ searchText:`, searchText);
      if (!searchText) {
        setOptions([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(searchUrl, {
          params: { filter: searchText },
          headers: { Authorization: token },
        });

        const results = response.data?.data?.result || [];
        const formattedOptions = results.map((item) => ({
          id: item._id,
          title: item.company_name, // Displayed in the list
        }));

        setOptions(formattedOptions);
        // setOpen(formattedOptions.length > 0); // Open dropdown if there are results
        setOpen(true);
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
    fetchOptions(value);
    if (value) {
      //   fetchOptions(value);
    } else {
      //   setOptions([]);
      //   setOpen(false); // Close the dropdown when input is empty
    }
  };

  // Handle option selection from dropdown
  const handleSelect = (option) => {
    setInputValue(option.title);
    setFieldValue(name, option.id); // Set selected ID in Formik state
    setOpen(false); // Close the dropdown after selection
  };

  // Handle "Add New" action
  const handleAddNew = () => {
    onAddNew(inputValue); // Trigger the add new action
    setOpen(false); // Close the dropdown after adding new
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

        menuItems.push(
          <MenuItem key="add-new" onClick={handleAddNew}>
            <Button>Add New</Button>
          </MenuItem>
        );
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

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        label={label}
        value={inputValue}
        variant="standard"
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        fullWidth
        inputRef={inputRef} // Set the inputRef to manage the anchor
        autoComplete="off"
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />
      {/* Dropdown for showing options */}

      {open && (
        <Paper
          style={{
            position: "absolute",
            top: "100%", // Position below the TextField
            left: 0,
            zIndex: 1,
            maxHeight: 200,
            width: "100%", // Match width of TextField
            overflowY: "auto",
          }}
        >
          {renderMenuItems()}
        </Paper>
      )}
    </div>
  );
};

export default SearchInput2;

