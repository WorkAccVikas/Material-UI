import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Define columns with fixed widths
const columns = [
  { id: "col1", label: "Column 1", width: 150 },
  { id: "col2", label: "Column 2", width: 150 },
  { id: "col3", label: "Column 3", width: 150 },
  { id: "col4", label: "Column 4", width: 150 },
  // Middle columns (scrollable)
  { id: "col5", label: "Column 5", width: 150 },
  { id: "col6", label: "Column 6", width: 150 },
  { id: "col7", label: "Column 7", width: 150 },
  { id: "col8", label: "Column 8", width: 150 },
  { id: "col9", label: "Column 9", width: 150 },
  { id: "col10", label: "Column 10", width: 150 },
  { id: "col11", label: "Column 11", width: 150 },
  { id: "col12", label: "Column 12", width: 150 },
  { id: "col13", label: "Column 13", width: 150 },
  { id: "col14", label: "Column 14", width: 150 },
  { id: "col15", label: "Column 15", width: 150 },
  { id: "col16", label: "Column 16", width: 150 },
  { id: "col17", label: "Column 17", width: 150 },
  // Fixed last columns
  { id: "col18", label: "Column 18", width: 150 },
  { id: "col19", label: "Column 19", width: 150 },
  { id: "col20", label: "Column 20", width: 150 },
];

// Sample data
const data = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  col1: `Data 1-${index + 1}`,
  col2: `Data 2-${index + 1}`,
  col3: `Data 3-${index + 1}`,
  col4: `Data 4-${index + 1}`,
  col5: `Data 5-${index + 1}`,
  col6: `Data 6-${index + 1}`,
  col7: `Data 7-${index + 1}`,
  col8: `Data 8-${index + 1}`,
  col9: `Data 9-${index + 1}`,
  col10: `Data 10-${index + 1}`,
  col11: `Data 11-${index + 1}`,
  col12: `Data 12-${index + 1}`,
  col13: `Data 13-${index + 1}`,
  col14: `Data 14-${index + 1}`,
  col15: `Data 15-${index + 1}`,
  col16: `Data 16-${index + 1}`,
  col17: `Data 17-${index + 1}`,
  col18: `Data 18-${index + 1}`,
  col19: `Data 19-${index + 1}`,
  col20: `Data 20-${index + 1}`,
}));

const StickyTable = () => {
  // Calculate the cumulative width of fixed columns for proper positioning
  const getLeftOffset = (index) => {
    return columns.slice(0, index).reduce((sum, col) => sum + col.width, 0);
  };

  const getRightOffset = (index) => {
    return columns.slice(index + 1).reduce((sum, col) => sum + col.width, 0);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "100%", overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              const isStickyLeft = index < 4;
              const isStickyRight = index >= columns.length - 3;

              let stickyStyle = {};
              if (isStickyLeft) {
                stickyStyle = {
                  position: "sticky",
                  left: getLeftOffset(index),
                  zIndex: 2,
                  backgroundColor: "#f4f4f4",
                };
              } else if (isStickyRight) {
                stickyStyle = {
                  position: "sticky",
                  right: getRightOffset(index),
                  zIndex: 2,
                  backgroundColor: "#f4f4f4",
                };
              }

              return (
                <TableCell
                  key={column.id}
                  style={{ ...stickyStyle, width: column.width }}
                >
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column, index) => {
                const isStickyLeft = index < 4;
                const isStickyRight = index >= columns.length - 3;

                let stickyStyle = {};
                if (isStickyLeft) {
                  stickyStyle = {
                    position: "sticky",
                    left: getLeftOffset(index),
                    backgroundColor: "#fff",
                  };
                } else if (isStickyRight) {
                  stickyStyle = {
                    position: "sticky",
                    right: getRightOffset(index),
                    backgroundColor: "#fff",
                  };
                }

                return (
                  <TableCell
                    key={column.id}
                    style={{ ...stickyStyle, width: column.width }}
                  >
                    {row[column.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StickyTable;
