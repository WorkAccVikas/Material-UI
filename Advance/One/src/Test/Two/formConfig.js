import * as Yup from "yup";
import MyCustomComponent from "./MyCustomComponent";

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
    name: "customField",
    label: "Custom Field",
    type: "custom",
    validation: Yup.string().required("This is required"),
    component: MyCustomComponent, // Custom component
    grid: { xs: 12 },
    customProps: { color: "success" }, // Additional props specific to the custom component
  },
];
