import React, { useEffect } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField, styled } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// Replacing makeStyles with styled API
const Root = styled("div")(({ theme }) => ({
  width: 500,
  "& > * + *": {
    marginTop: theme.spacing(3),
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Tags() {
  useEffect(() => {
    console.log("Component has mounted");
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Root>
      <Autocomplete
        size="small"
        multiple
        disableCloseOnSelect
        limitTags={1}
        id="tags-standard"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[1]]}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
    </Root>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
