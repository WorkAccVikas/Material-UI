import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import ConfigurableAutocomplete1 from "../Seven/ConfigurableAutocomplete1";
import * as Yup from "yup";
import RateMasterTable from "./RateMasterTable";
import MainCard from "../../components/MainCard";
import { Trash } from "iconsax-react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Njc5NDRmZWQ5ZDY0ZTY0MmViZjkzYzIiLCJ1c2VyVHlwZSI6MSwiaWF0IjoxNzI5MjQ2Mzg2fQ.lNtgnKrDL79vP7lfsBJSoh09FhYU42YPyP_tle10b3k";

// const validationSchema = Yup.object({
//   vendorID: Yup.array()
//     .min(1, "At least one vendor should be selected")
//     .required("Vendor ID is required"),
//   companyID: Yup.array()
//     .min(1, "At least one company should be selected")
//     .required("Company ID is required"),
//   vehicleTypeID: Yup.array()
//     .min(1, "At least one vehicle type should be selected")
//     .required("Vehicle Type ID is required"),
//   rateData: Yup.array().of(
//     Yup.object({
//       _id: Yup.string().required("Vendor ID is required"),
//       company_name: Yup.string().required("Company name is required"),
//       effectiveDate: Yup.date()
//         .required("Effective Date is required")
//         .max(new Date(), "Effective Date cannot be in the future"),
//       // .nullable(),
//       billingCycle: Yup.string()
//         .required("Billing Cycle is required")
//         .oneOf(["25 days", "30 days", "45 days"], "Invalid billing cycle")
//         .nullable(),
//       rateMaster: Yup.array().of(
//         Yup.object({
//           zoneNameID: Yup.string().required("Zone Name is required"),
//           zoneTypeID: Yup.string().required("Zone Type is required"),
//           guard: Yup.number()
//             .required("Guard is required")
//             .typeError("Guard must be a valid number"),
//           guardPrice: Yup.number()
//             .required("Guard Price is required")
//             .typeError("Guard Price must be a valid number")
//             .min(0, "Guard Price must be a positive number"),
//         })
//       ),
//     })
//   ),
// });

const createDynamicValidationSchema = (fields) => {
  return fields?.reduce((schema, field) => {
    schema[field.name] = Yup.number()
      .required(`${field.label} is required`)
      .typeError(`${field.label} must be a valid number`)
      .min(0, `${field.label} must be a positive number`);
    return schema;
  }, {});
};

const formatDate = (dateString) => {
  // Convert the ISO 8601 date to YYYY-MM-DD
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
};

const handleBlurWithDefaultValue = (event, formik, fieldName, defaultValue) => {
  const value = event.target.value.trim(); // Trim to avoid spaces being considered empty
  if (!value) {
    formik.setFieldValue(fieldName, defaultValue); // Set default value
  }
};

const initialDefaultColumns = [
  "Zone Name",
  "Zone Type",
  "Guard",
  "Guard Price",
];

const initialDefaultValuesForColumns = {
  zoneNameID: "",
  zoneTypeID: "",
  guard: 0,
  guardPrice: 0,
};
const Two = () => {
  const [loading, setLoading] = useState(true);

  const [vendorList, setVendorList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);

  const columnsRef = useRef(initialDefaultColumns);
  const initialDefaultValuesForColumnsRef = useRef(
    initialDefaultValuesForColumns
  );
  const rateDataRef = useRef([]);

  const newColumnRef = useRef(null);

  console.log("rateDataRef: ", rateDataRef.current);

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
        rateMaster: Yup.array().of(
          Yup.object({
            zoneNameID: Yup.string().required("Zone Name is required"),
            zoneTypeID: Yup.string().required("Zone Type is required"),
            guard: Yup.number()
              .required("Guard is required")
              .typeError("Guard must be a valid number"),
            guardPrice: Yup.number()
              .required("Guard Price is required")
              .typeError("Guard Price must be a valid number")
              .min(0, "Guard Price must be a positive number"),
            ...createDynamicValidationSchema(newColumnRef.current), // Add dynamic keys here
          })
        ),
      })
    ),
  });

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

      const vehicleTypeIDs = formik.values.vehicleTypeID;

      console.log(`🚀 ~ updateRateData ~ vehicleTypeIDs:`, vehicleTypeIDs);

      const initialColumns = {
        zoneNameID: "",
        zoneTypeID: "",
        guard: 0,
        guardPrice: 0,
      };

      const updatedColumns = vehicleTypeIDs.reduce((acc, { columnName }) => {
        return {
          ...acc,
          [columnName]: 0, // Dynamically add columnName with value 0
          [`Dual ${columnName}`]: 0,
        };
      }, initialColumns);

      console.log(`🚀 ~ Updated Columns:`, updatedColumns);

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
        rateMaster: existingRate.rateMaster || [updatedColumns],
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
  const handleVehicleTypeChange = (selectedOptions, reason) => {
    console.log("IEE - ", reason);
    console.log("BI = ", rateDataRef.current);
    console.log(
      `🚀 ~ handleVehicleTypeChange ~ selectedOptions:`,
      selectedOptions
    );

    // const dynamicColumns = selectedOptions.map((item) => item.columnName);
    // // console.log("IE = ", columnsRef.current);
    // const x = selectedOptions.map((item) => `Dual ${item.columnName}`);

    // columnsRef.current = [...initialDefaultColumns, ...dynamicColumns, ...x];

    const newArray = selectedOptions.flatMap((item) => [
      item.columnName,
      `${item.columnName} Dual`,
    ]);
    columnsRef.current = [...initialDefaultColumns, ...newArray];

    console.log("IE = ", columnsRef.current);

    const updatedColumns = selectedOptions.reduce((acc, { columnName }) => {
      return {
        ...acc,
        [columnName]: 0, // Dynamically add columnName with value 0
        [`Dual ${columnName}`]: 0,
      };
    }, initialDefaultValuesForColumnsRef.current);

    initialDefaultValuesForColumnsRef.current = updatedColumns;

    // console.log(
    //   `🚀 ~ Updated Columns:`,
    //   initialDefaultValuesForColumnsRef.current
    // );

    // new columns stored in ref
    const newColumns = selectedOptions.flatMap(({ columnName }) => [
      { name: columnName, label: `Rate of ${columnName}` },
      { name: `Dual ${columnName}`, label: `Dual Rate of ${columnName}` },
    ]);

    newColumnRef.current = newColumns;

    formik.setFieldValue("vehicleTypeID", selectedOptions);

    if (reason === "clear") {
      console.log("clear running ...........");
      // Function to process the `rateMaster` data based on `x`
      const processData = (existed, x) => {
        return existed.map((item) => {
          item.rateMaster = item.rateMaster.map((rate) => {
            if (x.length === 0) {
              // If `x` is empty, retain only zoneNameID, zoneTypeID, guard, and guardPrice
              const filteredRate = Object.keys(rate).reduce((acc, key) => {
                if (
                  ["zoneNameID", "zoneTypeID", "guard", "guardPrice"].includes(
                    key
                  )
                ) {
                  acc[key] = rate[key];
                }
                return acc;
              }, {});
              return filteredRate;
            } else {
              // Retain keys based on `columnName` from `x`, including "Dual" keys
              const allowedKeys = x
                .map((xItem) => [xItem.columnName, `Dual ${xItem.columnName}`])
                .flat();
              const filteredRate = Object.keys(rate).reduce((acc, key) => {
                if (
                  allowedKeys.includes(key) ||
                  ["zoneNameID", "zoneTypeID", "guard", "guardPrice"].includes(
                    key
                  )
                ) {
                  acc[key] = rate[key];
                }
                return acc;
              }, {});
              return filteredRate;
            }
          });
          return item;
        });
      };

      // Run the function with the data
      const result = processData(rateDataRef.current, selectedOptions);
      formik.setFieldValue("rateData", result);
    } else if (reason === "removeOption") {
      console.log("remove running ................");
      const allowedKeys = selectedOptions.flatMap((entry) => [
        entry.columnName,
        `Dual ${entry.columnName}`,
      ]);

      const updatedExisted = rateDataRef.current?.map((company) => ({
        ...company,
        rateMaster: company.rateMaster.map((rate) => {
          // Retain only allowed keys in rateMaster
          const filteredRate = {};
          allowedKeys.forEach((key) => {
            if (key in rate) {
              filteredRate[key] = rate[key];
            }
          });
          // Include original keys like zoneNameID, zoneTypeID, guard, guardPrice
          filteredRate.zoneNameID = rate.zoneNameID;
          filteredRate.zoneTypeID = rate.zoneTypeID;
          filteredRate.guard = rate.guard;
          filteredRate.guardPrice = rate.guardPrice;
          return filteredRate;
        }),
      }));
      formik.setFieldValue("rateData", updatedExisted);
    } else if (reason === "selectOption") {
      console.log("select running ................");

      // Iterate over `existed` and update the `rateMaster` for each company based on `x`
      const updatedExisted = rateDataRef.current.map((company) => {
        return {
          ...company,
          rateMaster: company.rateMaster.map((rm) => {
            selectedOptions.forEach((item) => {
              // For each item in x, ensure the base and dual keys are updated or added
              if (!rm.hasOwnProperty(item.columnName)) {
                rm[item.columnName] = 0; // Add base key if missing
              }
              if (!rm.hasOwnProperty(`Dual ${item.columnName}`)) {
                rm[`Dual ${item.columnName}`] = 0; // Add dual key if missing
              }
            });
            return rm;
          }),
        };
      });

      console.log("updatedExisted", updatedExisted);

      formik.setFieldValue("rateData", updatedExisted);
    }
  };

  useEffect(() => {
    console.log("rateData useEffect running");
    console.log("rateData", formik.values.rateData);
    rateDataRef.current = formik.values.rateData;
  }, [formik.values.rateData]);

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
                  onChange={(selectedOptions, reason) => {
                    handleVehicleTypeChange(selectedOptions, reason);
                  }}
                  // onChange={handleSelectChange("vehicleTypeID")}
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

            {formik.values.rateData.length > 0 && (
              <FieldArray name="rateData">
                {({ insert, remove, push }) => (
                  <Stack gap={2}>
                    {formik.values.rateData.map((rateData, dataIndex) => (
                      <MainCard
                        key={dataIndex}
                        title={`Rate Data ${dataIndex + 1} - ${
                          rateData.company_name
                        }`}
                        secondary={
                          <>
                            <Stack gap={2} direction="row">
                              <TextField
                                fullWidth
                                label="Effective Date"
                                type="date"
                                value={formatDate(rateData.effectiveDate)}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `rateData[${dataIndex}].effectiveDate`,

                                    e.target.value
                                  );
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={
                                  formik.touched.rateData?.[dataIndex]
                                    ?.effectiveDate &&
                                  Boolean(
                                    formik.errors.rateData?.[dataIndex]
                                      ?.effectiveDate
                                  )
                                }
                                helperText={
                                  formik.touched.rateData?.[dataIndex]
                                    ?.effectiveDate &&
                                  formik.errors.rateData?.[dataIndex]
                                    ?.effectiveDate
                                }
                              />

                              <TextField
                                fullWidth
                                label="Billing Cycle"
                                value={rateData.billingCycle || ""}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `rateData[${dataIndex}].billingCycle`,

                                    e.target.value
                                  );
                                }}
                                error={
                                  formik.touched.rateData?.[dataIndex]
                                    ?.billingCycle &&
                                  Boolean(
                                    formik.errors.rateData?.[dataIndex]
                                      ?.billingCycle
                                  )
                                }
                                helperText={
                                  formik.touched.rateData?.[dataIndex]
                                    ?.billingCycle &&
                                  formik.errors.rateData?.[dataIndex]
                                    ?.billingCycle
                                }
                              />
                            </Stack>
                          </>
                        }
                      >
                        {/* Table for Rate Master */}
                        <TableContainer
                          component={Paper}
                          sx={{ marginBottom: 2 }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                {columnsRef.current?.map((column) => (
                                  <TableCell key={column}>{column}</TableCell>
                                ))}
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              <FieldArray
                                name={`rateData[${dataIndex}].rateMaster`}
                              >
                                {({
                                  insert: insertRate,
                                  remove: removeRate,
                                  push: pushRate,
                                }) => {
                                  return (
                                    <>
                                      {rateData.rateMaster.map(
                                        (rate, rateIndex) => {
                                          return (
                                            <TableRow key={rateIndex}>
                                              {/* Zone Name */}
                                              <TableCell>
                                                <TextField
                                                  label="Zone"
                                                  fullWidth
                                                  name={`rateData[${dataIndex}].rateMaster[${rateIndex}].zoneNameID`}
                                                  value={rate.zoneNameID}
                                                  onChange={formik.handleChange}
                                                  error={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneNameID &&
                                                    Boolean(
                                                      formik.errors.rateData?.[
                                                        dataIndex
                                                      ]?.rateMaster?.[rateIndex]
                                                        ?.zoneNameID
                                                    )
                                                  }
                                                  helperText={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneNameID &&
                                                    formik.errors.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneNameID
                                                  }
                                                />
                                              </TableCell>

                                              {/* Zone Type */}
                                              <TableCell>
                                                <TextField
                                                  label="Zone Type"
                                                  fullWidth
                                                  name={`rateData[${dataIndex}].rateMaster[${rateIndex}].zoneTypeID`}
                                                  value={rate.zoneTypeID}
                                                  onChange={formik.handleChange}
                                                  error={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneTypeID &&
                                                    Boolean(
                                                      formik.errors.rateData?.[
                                                        dataIndex
                                                      ]?.rateMaster?.[rateIndex]
                                                        ?.zoneTypeID
                                                    )
                                                  }
                                                  helperText={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneTypeID &&
                                                    formik.errors.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.zoneTypeID
                                                  }
                                                />
                                              </TableCell>

                                              {/* Guard */}
                                              <TableCell>
                                                <TextField
                                                  label="Guard"
                                                  fullWidth
                                                  name={`rateData[${dataIndex}].rateMaster[${rateIndex}].guard`}
                                                  value={rate.guard}
                                                  onChange={formik.handleChange}
                                                  error={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guard &&
                                                    Boolean(
                                                      formik.errors.rateData?.[
                                                        dataIndex
                                                      ]?.rateMaster?.[rateIndex]
                                                        ?.guard
                                                    )
                                                  }
                                                  helperText={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guard &&
                                                    formik.errors.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guard
                                                  }
                                                />
                                              </TableCell>

                                              {/* Guard Price */}
                                              <TableCell>
                                                <TextField
                                                  label="Guard Price"
                                                  fullWidth
                                                  // name={`rateData[${dataIndex}].rateMaster[${rateIndex}].guardPrice`}
                                                  value={rate.guardPrice}
                                                  // onChange={formik.handleChange}
                                                  // onChange={(e) => {
                                                  //   const { value } = e.target;
                                                  //   formik.setFieldValue(
                                                  //     `rateData[${dataIndex}].rateMaster[${rateIndex}].guardPrice`,
                                                  //     value
                                                  //   );
                                                  // }}
                                                  // onBlur={() => {
                                                  //   const fieldName = `rateData[${dataIndex}].rateMaster[${rateIndex}].guardPrice`;
                                                  //   const currentValue =
                                                  //     formik.values.rateData?.[
                                                  //       dataIndex
                                                  //     ]?.rateMaster?.[rateIndex]
                                                  //       ?.guardPrice;
                                                  //   if (!currentValue) {
                                                  //     formik.setFieldValue(
                                                  //       fieldName,
                                                  //       0
                                                  //     );
                                                  //   }
                                                  // }}

                                                  {...formik.getFieldProps(
                                                    `rateData[${dataIndex}].rateMaster[${rateIndex}].guardPrice`
                                                  )}
                                                  onBlur={(e) =>
                                                    handleBlurWithDefaultValue(
                                                      e,
                                                      formik,
                                                      `rateData[${dataIndex}].rateMaster[${rateIndex}].guardPrice`,
                                                      0
                                                    )
                                                  }
                                                  error={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guardPrice &&
                                                    Boolean(
                                                      formik.errors.rateData?.[
                                                        dataIndex
                                                      ]?.rateMaster?.[rateIndex]
                                                        ?.guardPrice
                                                    )
                                                  }
                                                  helperText={
                                                    formik.touched.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guardPrice &&
                                                    formik.errors.rateData?.[
                                                      dataIndex
                                                    ]?.rateMaster?.[rateIndex]
                                                      ?.guardPrice
                                                  }
                                                />
                                              </TableCell>

                                              {/* Dynamic */}
                                              {newColumnRef.current?.map(
                                                (item, idx) => (
                                                  <TableCell key={idx}>
                                                    <TextField
                                                      label={item.label}
                                                      fullWidth
                                                      name={`rateData[${dataIndex}].rateMaster[${rateIndex}].${item.name}`}
                                                      value={
                                                        rate[`${item.name}`]
                                                      }
                                                      onChange={
                                                        formik.handleChange
                                                      }
                                                      error={
                                                        formik.touched
                                                          .rateData?.[dataIndex]
                                                          ?.rateMaster?.[
                                                          rateIndex
                                                        ]?.[`${item.name}`] &&
                                                        Boolean(
                                                          formik.errors
                                                            .rateData?.[
                                                            dataIndex
                                                          ]?.rateMaster?.[
                                                            rateIndex
                                                          ]?.[`${item.name}`]
                                                        )
                                                      }
                                                      helperText={
                                                        formik.touched
                                                          .rateData?.[dataIndex]
                                                          ?.rateMaster?.[
                                                          rateIndex
                                                        ]?.[`${item.name}`] &&
                                                        formik.errors
                                                          .rateData?.[dataIndex]
                                                          ?.rateMaster?.[
                                                          rateIndex
                                                        ]?.[`${item.name}`]
                                                      }
                                                    />
                                                  </TableCell>
                                                )
                                              )}

                                              <TableCell>
                                                <IconButton
                                                  onClick={() => {
                                                    removeRate(rateIndex);
                                                  }}
                                                >
                                                  <Trash color="red" />
                                                </IconButton>
                                              </TableCell>
                                            </TableRow>
                                          );
                                        }
                                      )}

                                      <TableRow>
                                        {/* <TableCell colSpan={4}></TableCell> */}
                                        <TableCell>
                                          <Button
                                            variant="outlined"
                                            onClick={() => {
                                              // alert(`Add Rate = ${dataIndex}`);
                                              // alert(
                                              //   JSON.stringify(
                                              //     initialDefaultValuesForColumnsRef,
                                              //     null,
                                              //     2
                                              //   )
                                              // );
                                              pushRate(
                                                initialDefaultValuesForColumnsRef.current
                                              );
                                            }}
                                          >
                                            Add Rate
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  );
                                }}
                              </FieldArray>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </MainCard>
                    ))}
                  </Stack>
                )}
              </FieldArray>
            )}

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
