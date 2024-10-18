import { useFormikContext, Field } from "formik";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const RenderField = ({ field }) => {
  const {
    component,
    name,
    label,
    type,
    options,
    multiple,
    grid,
    variant,
    fullWidth,
    style,
    customProps,
  } = field;

  const { values, setFieldValue, touched, errors } = useFormikContext();
  console.log("name", name);

  const gridProps = grid ? { ...grid } : { xs: 12 };

  const fieldProps = {
    fullWidth: fullWidth !== undefined ? fullWidth : true,
    variant: variant || "outlined",
    style: style || {},
  };

  // Handle custom components
  if (typeof component === "function") {
    const CustomComponent = component;
    return (
      <Grid item {...gridProps} key={name}>
        <CustomComponent
          label={label}
          value={values[name]}
          error={touched[name] && errors[name]}
          helperText={touched[name] && errors[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          {...customProps} // Pass any additional custom props
        />
      </Grid>
    );
  }

  switch (component) {
    case "TextField":
      console.log("Textfield");
      return (
        <Grid item {...gridProps} key={name}>
          <Field
            name={name}
            as={TextField}
            label={label}
            type={type}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            {...fieldProps}
          />
        </Grid>
      );
    case "Select":
      return (
        <Grid item {...gridProps} key={name}>
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Field name={name} as={Select} label={label}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
        </Grid>
      );
    case "Autocomplete":
      return (
        <Grid item {...gridProps} key={name}>
          <Autocomplete
            multiple={multiple}
            options={options}
            value={values[name] || (multiple ? [] : "")}
            onChange={(e, value) => setFieldValue(name, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                fullWidth
              />
            )}
          />
        </Grid>
      );
    case "Checkbox":
      return (
        <Grid item {...gridProps} key={name}>
          <Field name={name}>
            {({ field }) => (
              <Checkbox
                {...field}
                checked={values[name]}
                onChange={(e) => setFieldValue(name, e.target.checked)}
              />
            )}
          </Field>
        </Grid>
      );
    default:
      return null;
  }
};

export default RenderField;
