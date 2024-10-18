import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies baseline CSS for consistent styling */}
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
);
