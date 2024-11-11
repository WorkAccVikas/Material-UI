import ConfigurableAutocomplete from "./ConfigurableAutocomplete";
import data from "./data/data1.json";

const Six = () => {
  const handleSelectionChange = (newSelection) => {
    console.log("Selected movies:", newSelection);
  };

  return (
    <div>
      <ConfigurableAutocomplete
        id="movie-configurable-autocomplete"
        options={data}
        // getOptionLabel={(option) => option.label}
        onChange={handleSelectionChange}
        label="Movies"
        placeholder="Select your favorite movies"
        selectAllLabel="Select All Movies"
        disableCloseOnSelect // Disable closing the menu when an item is selected
        // hideSelectAll
        // filterSelectedOptions
      />
    </div>
  );
};

export default Six;
