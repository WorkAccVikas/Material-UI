import { Formik, Form } from "formik";
import { Grid, Button } from "@mui/material";
import * as Yup from "yup";
import RenderField from "./RenderField"; // Adjust path as necessary

const createValidationSchema = (config) => {
  const shape = {};
  config.forEach((field) => {
    shape[field.name] = field.validation;
  });
  return Yup.object().shape(shape);
};

const DynamicForm = ({ formConfig }) => {
  console.log("FormConfig", formConfig);
  const initialValues = formConfig.reduce((acc, field) => {
    acc[field.name] = field.multiple ? [] : "";
    return acc;
  }, {});

  const validationSchema = createValidationSchema(formConfig);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log("Form Values", values)}
    >
      <Form>
        <Grid container spacing={2}>
          {formConfig.map((field) => (
            <RenderField key={field.name} field={field} />
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default DynamicForm;
