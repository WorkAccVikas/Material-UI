import React, { useState } from "react";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Name is required"),
      city: Yup.string().required("City is required"),
      rateMaster: Yup.array().of(
        Yup.object({
          guard: Yup.number()
            .required("Guard is required")
            .typeError("Guard must be a valid number"),
          guardPrice: Yup.number()
            .required("Guard Price is required")
            .typeError("Guard Price must be a valid number")
            .min(0, "Guard Price must be a positive number"),
          zone: Yup.string().required("Zone is required"),
        })
      ),
    })
  ),
});

// Initial form values
const initialValues = {
  data: [
    {
      name: "",
      city: "",
      rateMaster: [
        {
          guard: 0,
          guardPrice: 0,
          zone: "",
        },
      ],
    },
  ],
};

const Six = () => {
  const [loadingStates, setLoadingStates] = useState([]); // Loader state for each `dataIndex`
  const workers = {}; // Store Web Workers for each `dataIndex`

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAddRate = (pushRate, dataIndex) => {
    // Initialize the loader for the specific data index
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[dataIndex] = true;
    setLoadingStates(updatedLoadingStates);

    // Create a new Web Worker
    const worker = new Worker(new URL("./heavyWorker.js", import.meta.url));

    // Listen for the worker's message
    worker.onmessage = () => {
      // Stop the loader
      const updatedStates = [...loadingStates];
      updatedStates[dataIndex] = false;
      setLoadingStates(updatedStates);

      // Add a new rate
      pushRate({ guard: 0, guardPrice: 0, zone: "" });

      // Terminate the worker
      worker.terminate();
      delete workers[dataIndex];
    };

    // Start the heavy calculation
    worker.postMessage({ task: `HeavyTask_${dataIndex}` });

    // Store the worker
    workers[dataIndex] = worker;
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FieldArray name="data">
          {({ remove, push }) => (
            <div>
              {formik.values.data.map((dataItem, dataIndex) => (
                <Box key={dataIndex} sx={{ marginBottom: 3 }}>
                  {/* Card for Name and City */}
                  <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Data {dataIndex + 1}</Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          label="Name"
                          fullWidth
                          name={`data[${dataIndex}].name`}
                          value={dataItem.name}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.data?.[dataIndex]?.name &&
                            Boolean(formik.errors.data?.[dataIndex]?.name)
                          }
                          helperText={
                            formik.touched.data?.[dataIndex]?.name &&
                            formik.errors.data?.[dataIndex]?.name
                          }
                        />
                        <TextField
                          label="City"
                          fullWidth
                          name={`data[${dataIndex}].city`}
                          value={dataItem.city}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.data?.[dataIndex]?.city &&
                            Boolean(formik.errors.data?.[dataIndex]?.city)
                          }
                          helperText={
                            formik.touched.data?.[dataIndex]?.city &&
                            formik.errors.data?.[dataIndex]?.city
                          }
                        />
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Table for Rate Master */}
                  <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Guard</TableCell>
                          <TableCell>Guard Price</TableCell>
                          <TableCell>Zone</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray name={`data[${dataIndex}].rateMaster`}>
                          {({ push: pushRate }) => (
                            <>
                              {dataItem.rateMaster.map((rate, rateIndex) => (
                                <TableRow key={rateIndex}>
                                  <TableCell>
                                    <TextField
                                      label="Guard"
                                      fullWidth
                                      name={`data[${dataIndex}].rateMaster[${rateIndex}].guard`}
                                      value={rate.guard}
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.guard &&
                                        Boolean(
                                          formik.errors.data?.[dataIndex]
                                            ?.rateMaster?.[rateIndex]?.guard
                                        )
                                      }
                                      helperText={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.guard &&
                                        formik.errors.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.guard
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      label="Guard Price"
                                      fullWidth
                                      name={`data[${dataIndex}].rateMaster[${rateIndex}].guardPrice`}
                                      value={rate.guardPrice}
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]
                                          ?.guardPrice &&
                                        Boolean(
                                          formik.errors.data?.[dataIndex]
                                            ?.rateMaster?.[rateIndex]
                                            ?.guardPrice
                                        )
                                      }
                                      helperText={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]
                                          ?.guardPrice &&
                                        formik.errors.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.guardPrice
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      label="Zone"
                                      fullWidth
                                      name={`data[${dataIndex}].rateMaster[${rateIndex}].zone`}
                                      value={rate.zone}
                                      onChange={formik.handleChange}
                                      error={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.zone &&
                                        Boolean(
                                          formik.errors.data?.[dataIndex]
                                            ?.rateMaster?.[rateIndex]?.zone
                                        )
                                      }
                                      helperText={
                                        formik.touched.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.zone &&
                                        formik.errors.data?.[dataIndex]
                                          ?.rateMaster?.[rateIndex]?.zone
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      handleAddRate(pushRate, dataIndex)
                                    }
                                  >
                                    {loadingStates[dataIndex] ? (
                                      <CircularProgress size={20} />
                                    ) : (
                                      "Add Rate"
                                    )}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </FieldArray>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </div>
          )}
        </FieldArray>

        <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default Six;
