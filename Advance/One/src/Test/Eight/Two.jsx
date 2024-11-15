import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
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
  rateData: Yup.array().of(
    Yup.object({
      _id: Yup.string().required("Vendor ID is required"),
      company_name: Yup.string().required("Company name is required"),
      effectiveDate: Yup.date()
        .required("Effective Date is required")
        .max(new Date(), "Effective Date cannot be in the future"),
      // .nullable(),
      billingCycle: Yup.string()
        .required("Billing Cycle is required")
        .oneOf(["25 days", "30 days", "45 days"], "Invalid billing cycle")
        .nullable(),
    })
  ),
});

const formatDate = (dateString) => {
  // Convert the ISO 8601 date to YYYY-MM-DD
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
};

const Two = () => {
  const [vendorList, setVendorList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);

  const [loading, setLoading] = useState(true);

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

        const p3 = axios.get(
          "https://billing.mydigitick.com/api/v1/vehicleType",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const [r1, r2, r3] = await Promise.all([p1, p2, p3]);

        const modifiedVendorList = r1.data.data.map((vendor) => ({
          _id: vendor.vendorId,
          label: vendor.vendorCompanyName,
        }));

        // console.log("r1: ", modifiedVendorList);

        setVendorList(modifiedVendorList);

        const modifiedCompanyList = r2.data.companies.map((company) => ({
          ...company,
          label: company.company_name,
        }));

        // console.log("r2: ", modifiedCompanyList);
        setCompanyList(modifiedCompanyList);

        const modifiedVehicleTypeList = r3.data.data.map((vehicleType) => ({
          _id: vehicleType._id,
          label: vehicleType.vehicleTypeName,
          columnName: vehicleType.vehicleTypeName,
        }));

        // console.log("r3: ", modifiedVehicleTypeList);
        setVehicleTypeList(modifiedVehicleTypeList);
      } catch (error) {
        console.log("Promise all error: ", error);
      } finally {
        setLoading(false);
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
      rateData: [],
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

  // const handleCompanyChange = (selectedOptions) => {
  //   formik.setFieldValue("companyID", selectedOptions);

  //   // "_id": "673747f2625e65ed39170463",
  //   // "effectiveDate": "2024-09-05T00:00:00.000Z",
  //   // "company_name": "12NovNewCompany69",
  //   // "billingCycle": "15 days",
  //   // "label": "12NovNewCompany69"

  //   const newRateData = selectedOptions.map((company) => ({
  //     _id: company._id,
  //     effectiveDate: company.effectiveDate,
  //     company_name: company.company_name,
  //     billingCycle: company.billingCycle,
  //     rateMaster: [],
  //   }));

  //   formik.setFieldValue("rateData", newRateData);
  // };

  const updateRateData = (selectedOptions, currentRateData) => {
    const selectedCompanyIds = selectedOptions.map((company) => company._id);
    console.log(
      `🚀 ~ updateRateData ~ selectedCompanyIds:`,
      selectedCompanyIds
    );

    // Create a map of existing rateData for quick lookup
    const rateDataMap = currentRateData.reduce((acc, rate) => {
      acc[rate._id] = rate;
      return acc;
    }, {});

    console.log(`🚀 ~ updateRateData ~ rateDataMap:`, rateDataMap);

    // Update rateData for the selected companies or initialize new entries
    const updatedRateData = selectedOptions.map((company) => {
      const existingRate = rateDataMap[company._id] || {};

      console.log(`🚀 ~ updateRateData ~ existingRate:`, existingRate);

      return {
        _id: company._id,
        company_name: company.company_name,
        // effectiveDate:
        //   existingRate.effectiveDate || company.effectiveDate || "",
        effectiveDate:
          formatDate(existingRate.effectiveDate) ||
          formatDate(company.effectiveDate) ||
          "",
        billingCycle: existingRate.billingCycle || company.billingCycle || "",
      };
    });

    console.log(`🚀 ~ updateRateData ~ updatedRateData:`, updatedRateData);

    // Merge the updatedRateData with the existing rateData to preserve unselected companies
    const finalRateData = currentRateData.filter((rate) =>
      selectedCompanyIds.includes(rate._id)
    );

    // Add any new entries from updatedRateData
    return [...updatedRateData];
  };

  const handleCompanyChange = (selectedOptions) => {
    // Merge the existing rateData with the newly updated rateData
    const newRateData = updateRateData(selectedOptions, formik.values.rateData);

    // Update Formik state with the new rateData and selected companies
    formik.setFieldValue("rateData", newRateData);
    formik.setFieldValue("companyID", selectedOptions);
  };
  const handleVehicleTypeChange = (selectedOptions) => {
    formik.setFieldValue("vehicleTypeID", selectedOptions);
  };

  const handleSelectChange = (field) => (selectedOptions) => {
    formik.setFieldValue(field, selectedOptions);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );

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
                  // onChange={handleVendorChange}
                  onChange={handleSelectChange("vendorID")}
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
                <ConfigurableAutocomplete1
                  id="vehicle-type-multiple-autocomplete"
                  options={vehicleTypeList}
                  // onChange={handleVehicleTypeChange}
                  onChange={handleSelectChange("vehicleTypeID")}
                  label="Vehicle Types"
                  placeholder="Select your vehicle types"
                  selectAllLabel="Select All Vehicle Types"
                  disableCloseOnSelect
                  showCount
                  singularLabel="vehicle type" // Custom singular label
                  pluralLabel="vehicle types" // Custom plural label
                  value={formik.values.vehicleTypeID}
                  error={
                    formik.touched.vehicleTypeID && formik.errors.vehicleTypeID
                  }
                  helperText={
                    formik.touched.vehicleTypeID && formik.errors.vehicleTypeID
                  }
                />
              </Grid>
            </Grid>

            {/* 2nd row */}
            {/* <Box>2nd row</Box> */}
            {formik.values.rateData.map((rate, index) => (
              <Box
                key={rate._id}
                sx={{ border: "1px solid #ccc", padding: 2, marginBottom: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Vendor"
                      value={rate._id ? rate._id : ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={rate.company_name ? rate.company_name : ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Effective Date"
                      type="date"
                      value={formatDate(rate.effectiveDate)}
                      onChange={(e) => {
                        formik.setFieldValue(
                          `rateData[${index}].effectiveDate`,
                          e.target.value
                        );
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={
                        formik.touched.rateData?.[index]?.effectiveDate &&
                        Boolean(formik.errors.rateData?.[index]?.effectiveDate)
                      }
                      helperText={
                        formik.touched.rateData?.[index]?.effectiveDate &&
                        formik.errors.rateData?.[index]?.effectiveDate
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Billing Cycle"
                      value={rate.billingCycle || ""}
                      onChange={(e) => {
                        formik.setFieldValue(
                          `rateData[${index}].billingCycle`,
                          e.target.value
                        );
                      }}
                      error={
                        formik.touched.rateData?.[index]?.billingCycle &&
                        Boolean(formik.errors.rateData?.[index]?.billingCycle)
                      }
                      helperText={
                        formik.touched.rateData?.[index]?.billingCycle &&
                        formik.errors.rateData?.[index]?.billingCycle
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

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
