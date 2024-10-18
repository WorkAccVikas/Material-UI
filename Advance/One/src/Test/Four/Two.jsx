import { Button } from "@mui/material";
import { useState } from "react";

const CHUNK_SIZE = 1024 * 1024; // 1 MB chunks

export default function Two() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [error, setError] = useState(null); // Track errors

  const [count, setCount] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setTimeTaken(null);
    setError(null);
    setData([]);

    const worker = new Worker(new URL("./fileWorker2.js", import.meta.url));

    worker.postMessage({ file, chunkSize: CHUNK_SIZE });

    worker.onmessage = (e) => {
      const { chunk, finished, duration, error } = e.data;

      if (error) {
        setLoading(false);
        setError(error);
        worker.terminate();
        return;
      }

      if (chunk) {
        setData((prevData) => [...prevData, ...chunk]); // Append new data
      }

      if (finished) {
        worker.terminate();
        setLoading(false);
        if (duration) {
          setTimeTaken(duration); // Set the time taken to process the file
        }
      }
    };
  };

  return (
    <div>
      <Button onClick={() => setCount((p) => p + 1)}>Count: {count}</Button>
      <h1>Large XLSX File Processing</h1>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {timeTaken && <p>Time Taken: {timeTaken / 1000} seconds</p>}{" "}
      {error && <p>Error: {error}</p>} {/* Show errors if any */}
      <div>
        <h3>Data:</h3>
        <pre>{data.length}</pre>
      </div>
      <hr />
      <div>
        {data?.slice(0, 5)?.map((item, index) => {
          console.log(item);
          return (
            <div key={index}>
              {item["Region"]} - {item["Country"]} - {item["Item Type"]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
