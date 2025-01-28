import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "@mui/material";

const LogoutButton = ({ collapsed }) => {
  return collapsed ? (
    <FaSignOutAlt
      style={{
        fontSize: "24px",
        color: "white",
        margin: "0 auto",
        display: "block",
      }}
      onClick={() => console.log("Logout")}
    />
  ) : (
    <Button
      variant="contained"
      color="error"
      fullWidth
      onClick={() => console.log("Logout")}
      sx={{
        backgroundColor: "#e74c3c",
        "&:hover": { backgroundColor: "#c0392b" },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
