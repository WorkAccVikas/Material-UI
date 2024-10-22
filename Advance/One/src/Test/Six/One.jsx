import React, { useState } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import {
  Typography,
  Button,
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import * as Yup from "yup";

// Component to display IGST label
const IGSTLabel = ({ tax }) => (
  <Typography variant="h6" component="div">
    IGST: {tax}
  </Typography>
);

// Component to display CGST and SGST labels
const CGSTSGSTLabels = ({ tax }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Typography variant="h6" component="div">
        CGST: {(tax / 2).toFixed(2)}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="h6" component="div">
        SGST: {(tax / 2).toFixed(2)}
      </Typography>
    </Grid>
  </Grid>
);

const TaxForm = () => {
  const [type, setType] = useState(0); // type can be either 0 (IGST) or 1 (CGST + SGST)

  const formik = useFormik({
    initialValues: {
      tax: 60, // Tax field starts with a value of 60
    },
    validationSchema: Yup.object({
      tax: Yup.number()
        .required("Tax is required")
        .min(0, "Tax must be a positive value"),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
      // Handle form submission (e.g., send to server)
    },
  });

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Function to render the correct tax labels based on the selected type
  const renderTaxLabels = () => {
    if (type === 0) {
      return <IGSTLabel tax={formik.values.tax} />;
    }
    return <CGSTSGSTLabels tax={formik.values.tax} />;
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3} width="400px">
          {/* Dropdown to select tax type */}
          <TextField
            select
            label="Tax Type"
            value={type}
            onChange={handleTypeChange}
            fullWidth
          >
            <MenuItem value={0}>IGST</MenuItem>
            <MenuItem value={1}>CGST + SGST</MenuItem>
          </TextField>

          {/* Render the correct tax labels based on the type */}
          {renderTaxLabels()}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default TaxForm;
