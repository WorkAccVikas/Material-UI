import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
// import SearchInput2 from "./Select2";
// import SearchInput2 from "./Select3";
// import SearchInput2 from "./Select4";
import SearchInput2 from "./Select5";
import SearchInput6 from "./Select6";
import SearchInput7 from "./Select7";
import SearchInput8 from "./Select8";

const partiallyMatchedOptions = [
  {
    companyContract: "",
    MCDTax: 0,
    MCDAmount: 0,
    stateTax: 0,
    stateTaxAmount: 0,
    _id: "665868063d44db9cf1622592",
    company_name: "IN TECHNOLOGIES",
    contact_person: "SANDEEP KUMAR",
    email: "transport@intechnologies.net",
    state: "HARYANA",
    createdAt: "2024-05-30T11:50:30.621Z",
    updatedAt: "2024-05-30T11:50:30.621Z",
    __v: 0,
  },
  {
    _id: "66b45b51f0c47f53a22f8be9",
    status: 1,
    companyContract: "sewak-travels_1c100512-e515-46a5-8832-843b2f4cf944.jpeg",
    MCDTax: 0,
    MCDAmount: 0,
    stateTax: 0,
    stateTaxAmount: 0,
    company_name: "TechPlek",
    contact_person: "Pawan",
    company_email: "pawan@techplek.com",
    mobile: "9582030696",
    landline: "0114952368",
    PAN: "APBCK6995A",
    GSTIN: "07APBCK6995A1Z",
    postal_code: "110001",
    address: "hkdjncnds",
    city: "Delhi",
    state: "DELHI",
    cabProviderID: "667944fed9d64e642ebf93c2",
    createdAt: "2024-08-08T05:44:49.130Z",
    updatedAt: "2024-08-08T05:44:49.130Z",
    __v: 0,
  },
];
const exactMatchedOptions = [
  {
    companyContract: "",
    MCDTax: 0,
    MCDAmount: 0,
    stateTax: 0,
    stateTaxAmount: 0,
    _id: "665868063d44db9cf1622592",
    company_name: "IN TECHNOLOGIES",
    contact_person: "SANDEEP KUMAR",
    email: "transport@intechnologies.net",
    state: "HARYANA",
    createdAt: "2024-05-30T11:50:30.621Z",
    updatedAt: "2024-05-30T11:50:30.621Z",
    __v: 0,
  },
];

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
    <>
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
            {/* <SearchInput2
            label="Company 2"
            searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
            setFieldValue={setFieldValue}
            name="companyID" // Field name for the company ID
            onAddNew={handleAddNew}
            // debounceDelay={20000}
            additionalParams={{ limit: 5 }}
          /> */}
            {/* <SearchInput6
              label="Company 6"
              searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
              setFieldValue={setFieldValue}
              name="companyID" // Field name for the company ID
              onAddNew={handleAddNew}
              // debounceDelay={20000}
              additionalParams={{ limit: 5 }}
              formattedItem={{ title: "company_name", id: "_id" }}
            /> */}

            {/* <SearchInput7
              label="Company 7"
              searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
              setFieldValue={setFieldValue}
              name="companyID" // Field name for the company ID
              onAddNew={handleAddNew}
              // debounceDelay={20000}
              additionalParams={{ limit: 5 }}
              formattedItem={{ title: "company_name", id: "_id" }}
              // defaultOptions={partiallyMatchedOptions}
              defaultOptions={exactMatchedOptions}
            /> */}
            <SearchInput8
              label="Company 8"
              searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
              setFieldValue={setFieldValue}
              name="companyID" // Field name for the company ID
              onAddNew={handleAddNew}
              // debounceDelay={20000}
              additionalParams={{ limit: 5 }}
              formattedItem={{ title: "company_name", id: "_id" }}
              // defaultOptions={partiallyMatchedOptions}
              defaultOptions={exactMatchedOptions}
              searchPlaceholder="Search by company name"
              noResultsText="No company found"
            />

            {/* <SearchInput9
              label="Company 9"
              searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName" // Replace with your actual API endpoint
              setFieldValue={setFieldValue}
              name="companyID" // Field name for the company ID
              onAddNew={handleAddNew}
              // debounceDelay={20000}
              additionalParams={{ limit: 5 }}
              formattedItem={{ title: "company_name", id: "_id" }}
              // defaultOptions={partiallyMatchedOptions}
              defaultOptions={exactMatchedOptions}
              searchPlaceholder="Search by company name"
              noResultsText="No company found"
            /> */}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <hr />
      <pre></pre>
    </>
  );
};

export default MyForm;
