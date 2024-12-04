import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

// Remaining balance calculation function
const remainingBalFn = (total, received, tds) => {
  return total - received - (total * tds) / 100;
};

// Validation Schema
const validationSchema = Yup.object({
  receivedAmount: Yup.number()
    .min(0, "Received amount must be at least 0")
    // .test(
    //   "max-remaining",
    //   "Received amount exceeds the allowable limit",
    //   function (value) {
    //     const { totalAmount, TDS } = this.parent; // Access sibling fields
    //     console.log({ totalAmount, TDS });
    //     const maxAllowed = remainingBalFn(totalAmount, 0, TDS);
    //     console.log(`🚀 ~ maxAllowed:`, maxAllowed);
    //     return value <= maxAllowed;
    //   }
    // )
    .test("max-remaining", function (value) {
      const { totalAmount, TDS } = this.parent; // Access sibling fields
      const maxAllowed = remainingBalFn(totalAmount, 0, TDS);
      if (value > maxAllowed) {
        return this.createError({
          path: this.path,
          message: `Received amount exceeds the allowable limit of ₹${maxAllowed}`,
        });
      }
      return true;
    })
    .required("Received amount is required"),
  TDS: Yup.number()
    .min(0, "TDS must be at least 0")
    .max(100, "TDS cannot exceed 100")
    .required("TDS is required"),
});

const One = () => {
  const formik = useFormik({
    initialValues: {
      totalAmount: 1000,
      receivedAmount: 0,
      TDS: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted = ", values);
    },
  });

  const remainingBal = remainingBalFn(
    formik.values.totalAmount,
    formik.values.receivedAmount,
    formik.values.TDS
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Total Amount */}
          <Grid item xs={12} md={4}>
            <Stack gap={1}>
              <InputLabel>Total Amount</InputLabel>
              <Typography variant="h5">
                ₹ {formik.values.totalAmount}
              </Typography>
            </Stack>
          </Grid>

          {/* Received Amount */}
          <Grid item xs={12} md={4}>
            <Stack gap={1}>
              <InputLabel>Received Amount</InputLabel>
              <TextField
                type="number"
                name="receivedAmount"
                value={formik.values.receivedAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.receivedAmount &&
                  Boolean(formik.errors.receivedAmount)
                }
                helperText={
                  formik.touched.receivedAmount && formik.errors.receivedAmount
                }
                variant="outlined"
                placeholder="Enter received amount"
                size="small"
                inputProps={{
                  min: 0,
                  max: remainingBalFn(
                    formik.values.totalAmount,
                    0, // Already received is assumed to be 0
                    formik.values.TDS
                  ),
                }}
              />
            </Stack>
          </Grid>

          {/* TDS (in %) */}
          <Grid item xs={12} md={4}>
            <Stack gap={1}>
              <InputLabel>TDS (%)</InputLabel>
              <TextField
                type="number"
                name="TDS"
                value={formik.values.TDS}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.TDS && Boolean(formik.errors.TDS)}
                helperText={formik.touched.TDS && formik.errors.TDS}
                variant="outlined"
                placeholder="Enter TDS percentage"
                size="small"
                inputProps={{ min: 0, max: 100 }}
              />
            </Stack>
          </Grid>

          {/* Remaining Balance */}
          <Grid item xs={12}>
            <Stack gap={1}>
              <InputLabel>Remaining Balance</InputLabel>
              <Typography variant="h6" color="primary">
                ₹ {remainingBal.toFixed(2)}
              </Typography>
            </Stack>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default One;
