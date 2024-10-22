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
  MenuItem,
  CircularProgress,
  Button,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import { fetchOptions, formatItem } from "./searchService"; // Abstraction for API calls and data formatting

// Component: SearchInput
const SearchInput9 = ({
  label,
  searchFunction, // Abstracted search function (Dependency Inversion Principle)
  debounceDelay = 500,
  onAddNew,
  setFieldValue,
  name,
  filterKey = "filter",
  additionalParams = {},
  formattedItem,
  defaultOptions = [],
  searchPlaceholder = "Type to search",
  noResultsText = "No results found",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(() =>
    fetchOptions(defaultOptions, formattedItem)
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce(async (searchText) => {
      if (!searchText) {
        setOptions([]);
        setFieldValue(name, "");
        return;
      }

      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      try {
        const params = { [filterKey]: searchText, ...additionalParams };
        const response = await searchFunction(
          params,
          abortControllerRef.current.signal
        );
        const formattedOptions = response.map((item) =>
          formatItem(item, formattedItem)
        );
        setOptions(formattedOptions);
        setOpen(true);
      } catch (error) {
        if (!error.isCancel) {
          console.error("Error fetching options:", error);
        }
      } finally {
        setLoading(false);
      }
    }, debounceDelay),
    [
      debounceDelay,
      searchFunction,
      filterKey,
      additionalParams,
      formattedItem,
      setFieldValue,
      name,
    ]
  );

  // Handle input change and trigger the debounced fetch
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetch(value);
  };

  // Handle selection of an option
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
  // Handle 'Add New' option
  const handleAddNew = useCallback(
    (option, event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up
      onAddNew(inputValue); // Trigger the add new action
      setOpen(false); // Close the dropdown after adding new
    },
    [inputValue, onAddNew]
  );

  useEffect(() => {
    if (defaultOptions.length === 1) {
      const value = defaultOptions[0]?.[formattedItem.id] || "";
      const displayedItem = defaultOptions[0]?.[formattedItem.title] || "";
      setInputValue(displayedItem);
      setFieldValue(name, value);
    }
  }, [defaultOptions, formattedItem, setFieldValue, name]);

  const renderMenuItems = useMemo(() => {
    if (loading) {
      return (
        <MenuItem disabled>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Loading...</Typography>
            <CircularProgress size={24} />
          </Stack>
        </MenuItem>
      );
    }

    if (!inputValue && options.length === 0) {
      return <MenuItem disabled>{searchPlaceholder}</MenuItem>;
    }

    const renderOptions = options.length ? (
      options.map((option) => (
        <MenuItem
          key={option.id}
          onMouseDown={(event) => handleSelect(option, event)}
        >
          {option.title}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>{noResultsText}</MenuItem>
    );

    return (
      <>
        {renderOptions}
        <MenuItem onMouseDown={(e) => handleAddNew(null, e)}>
          <Button>Add New</Button>
        </MenuItem>
      </>
    );
  }, [
    loading,
    inputValue,
    options,
    handleSelect,
    handleAddNew,
    searchPlaceholder,
    noResultsText,
  ]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        label={label}
        value={inputValue}
        variant="standard"
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        fullWidth
        inputRef={inputRef}
        autoComplete="off"
        InputProps={{
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
      />
      {open && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1,
            maxHeight: 200,
            width: "100%",
            overflowY: "auto",
          }}
        >
          {renderMenuItems}
        </Paper>
      )}
    </div>
  );
};

// PropTypes validation
SearchInput9.propTypes = {
  label: PropTypes.string.isRequired,
  searchFunction: PropTypes.func.isRequired, // Dependency inversion: Abstracted search logic
  debounceDelay: PropTypes.number,
  onAddNew: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  filterKey: PropTypes.string,
  additionalParams: PropTypes.object,
  formattedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  defaultOptions: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  noResultsText: PropTypes.string,
};

export default SearchInput9;

/** SUMMARY : INCOMPLETE */

// https://chatgpt.com/share/6716b053-8494-800f-b9c8-2743c6ee012c
