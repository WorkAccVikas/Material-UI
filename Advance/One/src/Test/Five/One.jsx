import SearchInput from "./SearchAutocomplete";

const handleAddNew = (inputValue) => {
  console.log("Add new item:", inputValue);
};

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <SearchInput
        label="Search for a company"
        searchUrl="https://billing.mydigitick.com/api/v1/company/getCompanyByName"
        debounceDelay={500}
        onAddNew={handleAddNew} // Callback when the "Add New" option is clicked
      />
    </div>
  );
};

export default App;
