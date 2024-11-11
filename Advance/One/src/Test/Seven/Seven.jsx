import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import data from "./data/data1.json";
import ConfigurableAutocomplete1 from "./ConfigurableAutocomplete1";
import { Button } from "@mui/material";

const Seven = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      movies: [], // Initial empty array for movies
    },
    validationSchema: Yup.object({
      movies: Yup.array()
        .min(1, "At least one movie should be selected") // At least one movie
        .required("Movies selection is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      alert("Form submitted successfully!");
    },
  });

  // Handle selection change from ConfigurableAutocomplete
  const handleSelectionChange = (newSelection) => {
    formik.setFieldValue("movies", newSelection); // Update Formik's value for 'movies'
  };

  return (
    <div>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <ConfigurableAutocomplete1
            id="movie-configurable-autocomplete"
            options={data}
            onChange={handleSelectionChange}
            label="Movies"
            placeholder="Select your favorite movies"
            selectAllLabel="Select All Movies"
            disableCloseOnSelect
            showCount
            singularLabel="film" // Custom singular label
            pluralLabel="films" // Custom plural label
            value={formik.values.movies}
            error={formik.touched.movies && formik.errors.movies}
            helperText={formik.touched.movies && formik.errors.movies}
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Seven;
