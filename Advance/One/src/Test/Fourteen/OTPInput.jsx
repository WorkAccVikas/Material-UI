import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const OTPInput = ({ numFields, onComplete }) => {
  const [otp, setOtp] = useState(Array(numFields).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      // Ensure only numeric input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < numFields - 1) {
        inputRefs.current[index + 1].focus();
      }

      //   if (newOtp.every((digit) => digit !== "")) {
      //     onComplete(newOtp.join(""));
      //   }
      onComplete(newOtp.join(""));
    } 
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, numFields);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split("").forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      if (pasteData.length === numFields) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleFocus = (index) => (e) => {
    // Select the text in the input field when it gains focus
    e.target.select();
  };

  return (
    <Box display="flex" justifyContent="center" gap={2}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={handleFocus(index)} // Add onFocus handler
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center" },
          }}
          variant="outlined"
          size="small"
          sx={{ width: "50px" }}
        />
      ))}
    </Box>
  );
};

OTPInput.propTypes = {
  numFields: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default OTPInput;
