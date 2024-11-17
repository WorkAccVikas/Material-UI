import { Formik, FieldArray, Form, Field } from "formik";
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
  IconButton,
} from "@mui/material";
import { Add, Trash } from "iconsax-react";

const RateMasterTable = ({
  formik,
  index,
  columns,
  defaultValueForColumns,
}) => {
  console.log("columns", columns);
  console.log("defaultValueForColumns", defaultValueForColumns);


  return (
    <FieldArray
      name={`rateData[${index}].rateMaster`}
      render={(arrayHelpers) => (
        <Box sx={{ padding: 2 }}>
          <TableContainer sx={{ bgcolor: "pink" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, idx) => (
                    <TableCell key={idx}>{column}</TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>Vikas</TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              // Ensure rateMaster is initialized
              arrayHelpers.push(defaultValueForColumns);
            }}
          >
            Add New Rate
          </Button>
        </Box>
      )}
    />
  );
};

export default RateMasterTable;
