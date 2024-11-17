import PropTypes from "prop-types";
import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  Box,
  Stack,
  Typography,
} from "@mui/material";

const ConfigurableAutocomplete1 = ({
  id = "configurable-autocomplete",
  options = [],
  label = "Movies",
  placeholder = "Select Movies",
  getOptionLabel = (option) => option.label,
  onChange,
  filterSelectedOptions = false,
  value = [],
  selectAllLabel = "Select All",
  hideSelectAll = false,
  sx = {},
  error,
  helperText,
  showCount = false,
  singularLabel = "movie", // Default singular label
  pluralLabel = "movies", // Default plural label
  ...props
}) => {
  const [selectedMovies, setSelectedMovies] = useState(value);

  const optionsWithSelectAll = hideSelectAll
    ? options
    : [{ _id: "all", label: selectAllLabel }, ...options];

  const handleChange = (event, newValue, reason) => {
    if (newValue.some((item) => item._id === "all")) {
      if (selectedMovies.length !== options.length) {
        setSelectedMovies(options);
        if (onChange) onChange(options, reason);
      } else {
        setSelectedMovies([]);
        if (onChange) onChange([], reason);
      }
    } else {
      setSelectedMovies(newValue);
      if (onChange) onChange(newValue, reason);
    }
  };

  const isAllSelected = selectedMovies.length === options.length;

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
        onChange={handleChange}
        value={selectedMovies}
        renderOption={(props, option, { selected }) => {
          const { key, ...restProps } = props;
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
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={helperText}
          />
        )}
        sx={{
          "& .MuiOutlinedInput-root": { p: 1 },
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
          ...sx,
        }}
        {...props}
      />
      {showCount && selectedCount > 0 && (
        <Typography variant="body2">
          {selectedCount} {selectedCount === 1 ? singularLabel : pluralLabel}{" "}
          selected
        </Typography>
      )}
    </Stack>
  );
};

ConfigurableAutocomplete1.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  getOptionLabel: PropTypes.func,
  onChange: PropTypes.func,
  filterSelectedOptions: PropTypes.bool,
  value: PropTypes.array,
  selectAllLabel: PropTypes.string,
  hideSelectAll: PropTypes.bool,
  sx: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  showCount: PropTypes.bool,
  singularLabel: PropTypes.string, // Prop for custom singular label
  pluralLabel: PropTypes.string, // Prop for custom plural label
};

export default ConfigurableAutocomplete1;

/** SUMMARY :
 *  - Working as expected
 * - Configurable Multiple Autocomplete Component with Select All Option and Count Display configurable
 */
