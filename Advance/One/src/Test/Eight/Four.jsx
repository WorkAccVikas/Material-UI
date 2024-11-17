import React from "react";
import { useFormik, FormikProvider, FieldArray, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object({
  data: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Name is required"),
      city: Yup.string().required("City is required"),
      rateMaster: Yup.array().of(
        Yup.object({
          guard: Yup.number().required("Guard is required"),
          guardPrice: Yup.number().required("Guard Price is required"),
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

const MyForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FieldArray name="data">
          {({ insert, remove, push }) => (
            <div>
              {formik.values.data.map((dataItem, dataIndex) => (
                <Box key={dataIndex} sx={{ marginBottom: 3 }}>
                  <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>City</TableCell>
                          <TableCell colSpan={3}>Rate Master</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
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
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
                          {/* Nested FieldArray for rateMaster */}
                          <FieldArray name={`data[${dataIndex}].rateMaster`}>
                            {({
                              insert: insertRate,
                              remove: removeRate,
                              push: pushRate,
                            }) => (
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
                                            ?.rateMaster?.[rateIndex]
                                            ?.guardPrice
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
                                    <TableCell>
                                      <Button
                                        variant="outlined"
                                        onClick={() => removeRate(rateIndex)}
                                        color="error"
                                      >
                                        Remove Rate
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={4}></TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        pushRate({
                                          guard: 0,
                                          guardPrice: 0,
                                          zone: "",
                                        })
                                      }
                                    >
                                      Add Rate
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                          </FieldArray>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => remove(dataIndex)}
                              color="error"
                            >
                              Remove Data
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  push({
                    name: "",
                    city: "",
                    rateMaster: [{ guard: 0, guardPrice: 0, zone: "" }],
                  })
                }
              >
                Add Data
              </Button>
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

export default MyForm;
