import PropTypes from "prop-types";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
import { set } from "lodash";

// const formattedOptions = (options = [], formattedItem = {}) => {
//   console.log(`🚀 ~ formattedOptions ~ formattedItem:`, formattedItem);
//   console.log("formattedOptions", options);

//   const optionsLength = options.length;

//   let result;
//   if (optionsLength > 1) {
//     result = options.map((item) => ({
//       id: item[formattedItem.id],
//       title: item[formattedItem.title], // Displayed in the list
//     }));
//   } else if (optionsLength === 1) {
//     result = options.map((item) => ({
//       id: item[formattedItem.id],
//       title: item[formattedItem.title], // Displayed in the list
//     }));
//   } else {
//     result = [];
//   }

//   console.log("result", result);
//   //   return [];
//   return result;
// };

// Function to extract formatted data from a single item
const formatItem = (item, formattedItem) => ({
  id: item[formattedItem.id],
  title: item[formattedItem.title], // Displayed in the list
});

// Function to handle empty or single-option cases
const handleOptions = (options, formattedItem) => {
  if (!options.length) return []; // Return an empty array if no options

  return options.map((item) => formatItem(item, formattedItem));
};

// Main function to format options
const formattedOptions = (options = [], formattedItem = {}) => {
  console.log(`🚀 ~ formattedOptions ~ formattedItem:`, formattedItem);
  console.log("formattedOptions", options);

  const result = handleOptions(options, formattedItem);

  console.log("result", result);
  return result;
};

const SearchInput8 = ({
  label,
  searchUrl,
  debounceDelay = 500,
  onAddNew, // Callback for when "Add New" is clicked
  setFieldValue, // Formik function to set field value
  name, // Field name in Formik
  filterKey = "filter", // Configurable filter key
  additionalParams = {}, // Additional parameters for the API call
  formattedItem,
  defaultOptions = [],
  searchPlaceholder = "Type to search",
  noResultsText = "No results found",
}) => {
  console.log("SearchInput8 rendered");

  const [inputValue, setInputValue] = useState("");
  //   const [options, setOptions] = useState([]);
  const [options, setOptions] = useState(() =>
    formattedOptions(defaultOptions, formattedItem)
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Controls the dropdown
  const inputRef = useRef(null); // Reference to the input element
  const abortControllerRef = useRef(new AbortController()); // Store the AbortController instance

  // Debounced function to fetch options based on user input
  const fetchOptions = useCallback(
    debounce(async (searchText) => {
      console.log(`🚀 ~ debounce ~ searchText:`, searchText);
      if (!searchText) {
        setOptions([]);
        setFieldValue(name, "");
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
        // const formattedOptions = results.map((item) => ({
        //   id: item._id,
        //   title: item.company_name, // Displayed in the list
        // }));

        // const formattedOptions = results.map((item) => ({
        //   id: item[formattedItem.id],
        //   title: item[formattedItem.title], // Displayed in the list
        // }));

        const formattedOptions = handleOptions(results, formattedItem);

        console.log(`🚀 ~ debounce ~ formattedOptions:`, formattedOptions);

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
  // Wrap handleSelect in useCallback
  const handleSelect = useCallback(
    (option, event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up

      console.log(`🚀 ~ handleSelect ~ option:`, option);
      setInputValue(option.title);
      console.log("name", name);
      console.log("option.id", option.id);
      setFieldValue(name, option.id); // Set selected ID in Formik state
      setOpen(false); // Close the dropdown after selection
      setOptions([]);
    },
    [setFieldValue, name]
  );

  // Wrap handleAddNew in useCallback to avoid recreating it unnecessarily
  const handleAddNew = useCallback(
    (option, event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up
      onAddNew(inputValue); // Trigger the add new action
      setOpen(false); // Close the dropdown after adding new
    },
    [inputValue, onAddNew]
  );

  // Prepare menu items based on state

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

  useEffect(() => {
    console.log("useEffect for defaultOptions");
    if (defaultOptions.length === 1) {
      const value = defaultOptions[0]?.[formattedItem.id] || "";
      const displayedItem = defaultOptions[0]?.[formattedItem.title] || "";
      setInputValue(displayedItem);
      setFieldValue(name, value);
    }
  }, []);

  const renderMenuItems = useCallback(() => {
    console.log("renderMenuItems ....");
    // If loading, directly return the loading state
    if (loading) {
      return (
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
    }

    // If there is no input and no options, return "Type to search"
    if (!inputValue && options.length === 0) {
      return (
        <MenuItem key="type-to-search" disabled>
          {searchPlaceholder}
        </MenuItem>
      );
    }

    // Render available options or show "No results found"
    const renderOptions =
      options.length > 0 ? (
        options.map((option) => (
          <MenuItem
            key={option.id}
            onMouseDown={(event) => handleSelect(option, event)}
          >
            {option.title}
          </MenuItem>
        ))
      ) : (
        <MenuItem key="no-results" disabled>
          {noResultsText}
        </MenuItem>
      );

    // Add new button (always rendered if not loading)
    const renderAddNew = (
      <MenuItem key="add-new" onMouseDown={(e) => handleAddNew(null, e)}>
        <Button>Add New</Button>
      </MenuItem>
    );

    return (
      <>
        {renderOptions}
        {renderAddNew}
      </>
    );
  }, [loading, inputValue, options, handleSelect, handleAddNew]);

  // Use useMemo to cache the rendering of MenuItems to prevent unnecessary re-render
  const memoizedMenuItems = useMemo(() => renderMenuItems(), [renderMenuItems]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        label={label}
        value={inputValue}
        variant="standard"
        onChange={handleInputChange}
        onFocus={() => {
          console.log("onFocus");
          setOpen(true);
        }}
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
          {memoizedMenuItems}
        </Paper>
      )}
    </div>
  );
};

export default SearchInput8;

SearchInput8.propTypes = {
  label: PropTypes.string.isRequired,
  searchUrl: PropTypes.string.isRequired,
  debounceDelay: PropTypes.number,
  onAddNew: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  filterKey: PropTypes.string,
  additionalParams: PropTypes.object,
  formattedItem: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensuring 'id' is a required string
    title: PropTypes.string.isRequired, // Ensuring 'title' is a required string
  }).isRequired, // formattedItem itself is required
  defaultOptions: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  noResultsText: PropTypes.string,
};

/** SUMMARY :
 * - SearchInput8 : bug fixes and improvements from SearchInput7
 * - parent value is empty if already value and then clear from textfield
 * - it supports searchPlaceholder, noResultsText
 */
