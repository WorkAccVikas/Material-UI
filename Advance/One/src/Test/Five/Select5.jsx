import PropTypes from "prop-types";
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
  Stack,
  Typography,
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
  filterKey = "filter", // Configurable filter key
  additionalParams = {}, // Additional parameters for the API call
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true); // Controls the dropdown
  const inputRef = useRef(null); // Reference to the input element
  const abortControllerRef = useRef(new AbortController()); // Store the AbortController instance

  // Debounced function to fetch options based on user input
  const fetchOptions = useCallback(
    debounce(async (searchText) => {
      console.log(`🚀 ~ debounce ~ searchText:`, searchText);
      if (!searchText) {
        setOptions([]);
        return;
      }

      // Abort previous request
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController(); // Create a new AbortController

      setLoading(true);
      //   await new Promise((resolve) => setTimeout(resolve, 30000));
      try {
        // Prepare the parameters for the API call
        const params = { [filterKey]: searchText, ...additionalParams };

        const response = await axios.get(searchUrl, {
          //   params: { filter: searchText },
          params,
          headers: { Authorization: token },
          signal: abortControllerRef.current.signal, // Attach the abort signal
        });

        const results = response.data?.data?.result || [];
        const formattedOptions = results.map((item) => ({
          id: item._id,
          title: item.company_name, // Displayed in the list
        }));

        setOptions(formattedOptions);
        setOpen(true); // Open dropdown if there are results
      } catch (error) {
        // Check if the error is an abort error
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching options", error);
        }
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
  };

  // Handle option selection from dropdown
  const handleSelect = (option, event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up

    console.log(`🚀 ~ handleSelect ~ option:`, option);
    setInputValue(option.title);
    console.log("name", name);
    console.log("option.id", option.id);
    setFieldValue(name, option.id); // Set selected ID in Formik state
    setOpen(false); // Close the dropdown after selection
    setOptions([]);
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%", width: "100%" }}
          >
            <Typography>Loading...</Typography>
            <CircularProgress size={24} />
          </Stack>
        </MenuItem>
      );
    } else {
      if (options.length === 0 && inputValue) {
        menuItems.push(
          <MenuItem key="type-to-search" disabled>
            Type to search or add a new item
          </MenuItem>
        );
      } else if (options.length > 0) {
        options.forEach((option) => {
          menuItems.push(
            <MenuItem
              key={option.id}
              //   onClick={() => {
              //     console.log("Item clicked");
              //     handleSelect(option);
              //   }}
              onMouseDown={(event) => handleSelect(option, event)} // Use onMouseDown
            >
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
    console.log("handleClickOutside");
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      abortControllerRef.current.abort(); // Clean up on unmount
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

SearchInput2.propTypes = {
  label: PropTypes.string.isRequired,
  searchUrl: PropTypes.string.isRequired,
  debounceDelay: PropTypes.number,
  onAddNew: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  filterKey: PropTypes.string,
  additionalParams: PropTypes.object,
};

/** SUMMARY : 
 * The SearchInput2 component is a customizable search input field that integrates seamlessly with APIs, enabling real-time, debounced searching functionality. It is designed to dynamically fetch options from a given API endpoint as users type, offering an intuitive dropdown selection experience.
 * Fetches options: Utilizes debounced API calls to fetch search results from a specified searchUrl based on user input.
 * Handles API responses: Displays search results in a dropdown, allowing users to select from the options or add new entries when no results are found.
 * Formik integration: Easily integrates with Formik for form handling, using the setFieldValue prop to set the selected option's ID into the form's state.
 * Add New functionality: Provides a user-defined onAddNew callback, enabling the addition of new items when an existing option is not available.
 * Customization: Supports configurable debounce delays, filtering keys, and additional parameters for API requests.
 * Error handling: Manages loading states and provides graceful error handling, including support for request cancellation to avoid race conditions.
*/
