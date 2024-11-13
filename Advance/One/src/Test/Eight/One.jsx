import React, { useEffect, useState } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, Stack } from "@mui/material";

// Define your initial values
const initialValues = {
  rateData: [], // Example initial value for rateData
};

// Define your validation schema with Yup

const One = () => {
  console.log("One rendered");
  const [companyIDs, setCompanyIDs] = useState([]);
  const [vehicleTypeIDs, setVehicleTypeIDs] = useState([]);

  const handleCompanyChange = (event) => {
    setCompanyIDs((prev) => {
      const item = {
        _id: prev.length + 1,
        companyName: `Company ${prev.length + 1}`,
      };
      return [...prev, item];
    });
  };

  const handleVehicleTypeChange = (event) => {
    setVehicleTypeIDs((prev) => {
      const item = {
        _id: prev.length + 1,
        vehicleTypeName: `Vehicle Type ${prev.length + 1}`,
      };
      return [...prev, item];
    });
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  // Update rateData dynamically based on company and vehicle types
  useEffect(() => {
    // Dynamically add rateMaster fields for each vehicle type when a company is added
    if (companyIDs.length > 0) {
      formik.setFieldValue("rateData", [
        ...companyIDs.map((company) => ({
          rateMaster: [
            {
              zoneNameID: "",
              zoneTypeID: "",
              cabRate: 1,
              ...vehicleTypeIDs.reduce((acc, vehicleType) => {
                acc[vehicleType.vehicleTypeName] = "";
                return acc;
              }, {}),
            },
          ],
        })),
      ]);
    }
  }, [companyIDs, vehicleTypeIDs, formik]);

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompanyChange}
          >
            Add Company
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleVehicleTypeChange}
          >
            Add Vehicle Type
          </Button>
        </Stack>
        <Typography variant="h6" gutterBottom>
          Rate Information
        </Typography>
      </Form>
    </FormikProvider>
  );
};

export default One;
