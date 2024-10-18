import { useEffect, useRef } from "react";
import { createWorker } from "../workerUtils";

export const useWorker = (workerFunction, onMessage, onError) => {
  const workerRef = useRef(null);

  useEffect(() => {
    return () => {
      terminateWorker(); // Cleanup worker when the component unmounts
    };
  }, []);

  const terminateWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  const postMessage = (message) => {
    terminateWorker(); // Ensure previous worker is terminated before creating a new one

    workerRef.current = createWorker(workerFunction); // Create a new worker

    workerRef.current.onmessage = (event) => {
      onMessage(event.data); // Handle the worker message
      terminateWorker(); // Terminate the worker after processing
    };

    workerRef.current.onerror = (error) => {
      onError(error); // Handle worker error
      terminateWorker(); // Terminate the worker after error
    };

    // Post the message to the worker to start the task
    workerRef.current.postMessage(message);
  };

  return { postMessage, terminateWorker };
};
