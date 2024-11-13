import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NjhkMzdmNzAzNjlkYTMyMGUxZDViZWUiLCJ1c2VyVHlwZSI6NywiaWF0IjoxNzIyMzIwMjIzfQ.zIxRty260K3t9gi5wR_XjIrv7f1gEqEYnH1hHJFG6bY";

const Two = () => {
  const [vendorList, setVendorList] = useState([]);

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

        const [r1] = await Promise.all([p1]);

        const modifiedVendorList = r1.data.data.map((vendor) => ({
          _id: vendor.vendorId,
          label: vendor.vendorCompanyName,
        }));

        console.log("r1: ", modifiedVendorList);

        setVendorList(modifiedVendorList);
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
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            {/* 1st row */}
            <Grid container spacing={2}>
              {/* Vendor */}
              <Grid item xs={4}>
                Vendor
              </Grid>

              {/* Company */}
              <Grid item xs={4}></Grid>

              {/* Vehicle Type */}
              <Grid item xs={4}></Grid>
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
