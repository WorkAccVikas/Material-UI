import React from "react";
import Table from "./Table";

const One = () => {
  const columns = React.useMemo(
    () => [
      { Header: "Column 1", accessor: "col1" },
      { Header: "Column 2", accessor: "col2" },
      { Header: "Column 3", accessor: "col3" },
      { Header: "Column 4", accessor: "col4" },
      { Header: "Column 5", accessor: "col5" },
      { Header: "Column 6", accessor: "col6" },
      { Header: "Column 7", accessor: "col7" },
      { Header: "Column 8", accessor: "col8" },
      { Header: "Column 9", accessor: "col9" },
      { Header: "Column 10", accessor: "col10" },
      { Header: "Column 11", accessor: "col11" },
      { Header: "Column 12", accessor: "col12" },
      { Header: "Column 13", accessor: "col13" },
      { Header: "Column 14", accessor: "col14" },
      { Header: "Column 15", accessor: "col15" },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        col1: `Row ${i + 1} - Col 1`,
        col2: `Row ${i + 1} - Col 2`,
        col3: `Row ${i + 1} - Col 3`,
        col4: `Row ${i + 1} - Col 4`,
        col5: `Row ${i + 1} - Col 5`,
        col6: `Row ${i + 1} - Col 6`,
        col7: `Row ${i + 1} - Col 7`,
        col8: `Row ${i + 1} - Col 8`,
        col9: `Row ${i + 1} - Col 9`,
        col10: `Row ${i + 1} - Col 10`,
        col11: `Row ${i + 1} - Col 11`,
        col12: `Row ${i + 1} - Col 12`,
        col13: `Row ${i + 1} - Col 13`,
        col14: `Row ${i + 1} - Col 14`,
        col15: `Row ${i + 1} - Col 15`,
      })),
    []
  );

  return <Table columns={columns} data={data} />;
};

export default One;
