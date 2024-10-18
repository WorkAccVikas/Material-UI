import { useEffect, useRef } from "react";
import { createWorker } from "../workerUtils";

export const useWorker = (workerFunction, onMessage, onError) => {
  const workerRef = useRef(null);

  // Cleanup worker when component unmounts
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // Create a worker every time a message is posted
  const postMessage = (message) => {
    if (workerRef.current) {
      workerRef.current.terminate(); // Terminate the existing worker
    }

    // Create a new worker each time
    workerRef.current = createWorker(workerFunction);

    workerRef.current.onmessage = (event) => {
      onMessage(event.data);
      workerRef.current.terminate(); // Clean up worker after message handling
    };

    workerRef.current.onerror = (error) => {
      onError(error);
      workerRef.current.terminate(); // Clean up worker on error
    };

    // Post the message to start the worker task
    workerRef.current.postMessage(message);
  };

  return { postMessage };
};
