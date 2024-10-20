import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (searchQuery, signal) => {
    if (!searchQuery) return; // No query, return early

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?name=${searchQuery}`,
        {
          signal: signal, // Attach the abort signal
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetch function to prevent excessive API calls
  const debouncedFetchUsers = useCallback(
    debounce((query) => {
      const controller = new AbortController();
      fetchUsers(query, controller.signal);

      return () => {
        controller.abort(); // Clean up on unmount or new request
      };
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    debouncedFetchUsers(event.target.value); // Call the debounced fetch function
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      // This cleanup function will run when the component unmounts
      debouncedFetchUsers.cancel(); // Cancel any debounced calls
    };
  }, [debouncedFetchUsers]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for users..."
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
