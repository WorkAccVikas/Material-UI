import { TextField } from "@mui/material";

const MyCustomComponent = ({
  label,
  value,
  error,
  helperText,
  onChange,
  color,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={helperText}
      color={color} // Example of a custom prop being used
      fullWidth
    />
  );
};

export default MyCustomComponent;
