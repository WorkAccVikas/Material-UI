import * as Yup from "yup";

export const formConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: Yup.string().required("Name is required"),
    component: "TextField",
    grid: { xs: 12, sm: 6 },
    variant: "outlined",
    fullWidth: true,
    style: { marginBottom: "16px" },
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    validation: Yup.number().required("Age is required").min(0),
    component: "TextField",
    grid: { xs: 12, sm: 6 },
    variant: "outlined",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    component: "TextField",
    grid: { xs: 12 },
    variant: "filled",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    validation: Yup.string().required("Gender is required"),
    component: "Select",
    grid: { xs: 12, sm: 6 },
    variant: "outlined",
  },
  // Add more fields with design variations...
];
