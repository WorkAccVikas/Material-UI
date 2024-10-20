import React, { useState, useRef, useEffect } from "react";
import { TextField, MenuItem, Paper } from "@mui/material";

const CustomDropdownTextField = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const inputRef = useRef(null);

  const handleFocus = () => {
    setOpen(true);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setOpen(false);
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
        inputRef={inputRef}
        onFocus={handleFocus}
        label="Select an option"
        variant="outlined"
        fullWidth
        value={selectedOption} // Display the selected option
        readOnly // Prevent direct input
      />
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
          {options.map((option) => (
            <MenuItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default CustomDropdownTextField;
