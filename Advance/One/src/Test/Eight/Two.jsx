import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import ConfigurableAutocomplete1 from "../Seven/ConfigurableAutocomplete1";
import * as Yup from "yup";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Njc5NDRmZWQ5ZDY0ZTY0MmViZjkzYzIiLCJ1c2VyVHlwZSI6MSwiaWF0IjoxNzI5MjQ2Mzg2fQ.lNtgnKrDL79vP7lfsBJSoh09FhYU42YPyP_tle10b3k";

const validationSchema = Yup.object({
  vendorID: Yup.array()
    .min(1, "At least one vendor should be selected")
    .required("Vendor ID is required"),
  companyID: Yup.array()
    .min(1, "At least one company should be selected")
    .required("Company ID is required"),
  vehicleTypeID: Yup.array()
    .min(1, "At least one vehicle type should be selected")
    .required("Vehicle Type ID is required"),
});

const Two = () => {
  const [vendorList, setVendorList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    console.log("Two component mounted");

    (async () => {
      try {
        const p1 = axios.get(
          "https://billing.mydigitick.com/api/v1/vendor/names",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const p2 = axios.get(
          "https://billing.mydigitick.com/api/v1/company/all",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const [r1, r2] = await Promise.all([p1, p2]);

        const modifiedVendorList = r1.data.data.map((vendor) => ({
          _id: vendor.vendorId,
          label: vendor.vendorCompanyName,
        }));

        console.log("r1: ", modifiedVendorList);

        setVendorList(modifiedVendorList);

        const modifiedCompanyList = r2.data.companies.map((company) => ({
          ...company,
          label: company.company_name,
        }));

        console.log("r2: ", modifiedCompanyList);
        setCompanyList(modifiedCompanyList);
      } catch (error) {
        console.log("Promise all error: ", error);
      }
    })();

    return () => {
      console.log("Two component unmounted");
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      vendorID: [],
      companyID: [],
      vehicleTypeID: [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      alert("Form submitted successfully!");

      const vendorIDs = values.vendorID.map((vendor) => vendor._id);
      // const companyIDs = values.companyID.map((company) => company._id);
      // const vehicleTypeIDs = values.vehicleTypeID.map((vehicleType) => vehicleType._id);

      const payload = {
        vendorID: vendorIDs,
      };

      console.log("payload: ", payload);
    },
  });

  const handleVendorChange = (selectedOptions) => {
    formik.setFieldValue("vendorID", selectedOptions);
  };

  const handleCompanyChange = (selectedOptions) => {
    formik.setFieldValue("companyID", selectedOptions);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            {/* 1st row */}
            <Grid container spacing={2}>
              {/* Vendor */}
              <Grid item xs={4}>
                <ConfigurableAutocomplete1
                  id="vendor-multiple-autocomplete"
                  options={vendorList}
                  onChange={handleVendorChange}
                  label="Vendors"
                  placeholder="Select your vendors"
                  selectAllLabel="Select All Vendors"
                  disableCloseOnSelect
                  showCount
                  singularLabel="vendor" // Custom singular label
                  pluralLabel="vendors" // Custom plural label
                  value={formik.values.vendorID}
                  error={formik.touched.vendorID && formik.errors.vendorID}
                  helperText={formik.touched.vendorID && formik.errors.vendorID}
                />
              </Grid>

              {/* Company */}
              <Grid item xs={4}>
                <ConfigurableAutocomplete1
                  id="company-multiple-autocomplete"
                  options={companyList}
                  onChange={handleCompanyChange}
                  label="Companies"
                  placeholder="Select your companies"
                  selectAllLabel="Select All Companies"
                  disableCloseOnSelect
                  showCount
                  singularLabel="company" // Custom singular label
                  pluralLabel="companies" // Custom plural label
                  value={formik.values.companyID}
                  error={formik.touched.companyID && formik.errors.companyID}
                  helperText={
                    formik.touched.companyID && formik.errors.companyID
                  }
                />
              </Grid>

              {/* Vehicle Type */}
              <Grid item xs={4}>
                Vehicle Type
              </Grid>
            </Grid>

            {/* 2nd row */}
            <Box>2nd row</Box>

            {/* 3rd row */}
            <Stack direction="row" gap={2} justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
};

export default Two;
