import Sidebar from "./components/Sidebar/Sidebar";
import { Box } from "@mui/material";

const One = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* CSS Baseline for consistent styling */}

      {/* Sidebar (20% width) */}
      <Sidebar />

      {/* Main Content (Remaining 80% width) */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f4f4",
          padding: "16px",
          overflow: "auto",
        }}
      >
        <h1>Welcome to the Dashboard</h1>
        <p>This is the main content area of your application.</p>
      </Box>
    </Box>
  );
};

export default One;
