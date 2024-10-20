// src/App.js

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { TextField, Paper, MenuItem, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const abortControllerRef = useRef(new AbortController()); // Store the AbortController instance

  // Debounced function to fetch users
  const fetchUsers = useCallback(
    debounce(async (searchText) => {
      if (!searchText) {
        setUsers([]);
        return;
      }

      // Abort previous request
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController(); // Create a new AbortController

      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users`,
          {
            params: { name: searchText },
            signal: abortControllerRef.current.signal, // Attach the abort signal
          }
        );

        // Set users from the response data
        setUsers(response.data);
        setOpen(true); // Open dropdown
      } catch (error) {
        // Check if the error is an abort error
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching users:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchUsers(value);
  };

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort(); // Clean up on unmount
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        label="Search User by Name"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        autoComplete="off"
      />
      {loading && <CircularProgress size={24} />}
      {open && users.length > 0 && (
        <Paper style={{ maxHeight: 200, overflowY: "auto", marginTop: "10px" }}>
          {users.map((user) => (
            <MenuItem key={user.id}>{user.name}</MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default App;
