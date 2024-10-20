import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SearchInput1 from "./SearchInput1";
import { Button, TextField } from "@mui/material";

const MyForm = () => {
  const initialValues = { city: "", companyID: "" };

  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    companyID: Yup.string().required("Company ID is required"),
  });

  const handleAddNew = (companyName) => {
    console.log("Add new company:", companyName);
    // You can implement the logic to add a new company here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form data", values);
        // Handle form submission here
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <Field
            name="city"
            as={TextField}
            label="City"
            fullWidth
            margin="normal"
          />
          <SearchInput1
            label="Company"
            searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
            setFieldValue={setFieldValue}
            name="companyID" // Field name for the company ID
            onAddNew={handleAddNew}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
