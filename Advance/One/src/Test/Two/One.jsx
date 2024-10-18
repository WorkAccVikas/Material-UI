import DynamicForm from "./DynamicForm";
import { formConfig } from "./formConfig"; // Form config with custom components

const App = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Dynamic Form with Custom Components</h1>
      <DynamicForm formConfig={formConfig} />
    </div>
  );
};

export default App;
