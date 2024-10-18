import { useState } from "react";

const CHUNK_SIZE = 1024 * 1024; // 1 MB chunks

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null); // State to store time taken

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setTimeTaken(null); // Reset time on each new file upload
    const worker = new Worker(new URL("./fileWorker1.js", import.meta.url));

    worker.postMessage({ file, chunkSize: CHUNK_SIZE });

    worker.onmessage = (e) => {
      const { chunk, finished, duration } = e.data;

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
      <h1>Large XLSX File Processing</h1>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {timeTaken && <p>Time Taken: {timeTaken / 1000} seconds</p>}{" "}
      {/* Show time taken */}
      <div>
        <h3>Data:</h3>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <pre>{data.length}</pre>
      </div>
    </div>
  );
}
