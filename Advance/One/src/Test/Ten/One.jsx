import React from "react";
import { useFormik, FormikProvider, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";

const TripForm = () => {
  // Validation schema
  const validationSchema = Yup.object({
    tripTime: Yup.string().required("Trip Time is required"),
    returnTime: Yup.string().when("dualTrip", {
      is: 1,
      then: Yup.string().required(
        "Return Time is required when Dual Trip is enabled"
      ),
      otherwise: Yup.string(),
    }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      tripTime: "",
      returnTime: "",
      dualTrip: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} noValidate>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Trip Scheduling Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trip Time"
              name="tripTime"
              value={values.tripTime}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.tripTime && Boolean(errors.tripTime)}
              helperText={touched.tripTime && errors.tripTime}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(values.dualTrip)}
                  onChange={(event) =>
                    setFieldValue("dualTrip", event.target.checked ? 1 : 0)
                  }
                />
              }
              label="Enable Dual Trip"
            />
          </Grid>
          {values.dualTrip === 1 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Return Time"
                name="returnTime"
                value={values.returnTime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.returnTime && Boolean(errors.returnTime)}
                helperText={touched.returnTime && errors.returnTime}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
};

export default TripForm;
