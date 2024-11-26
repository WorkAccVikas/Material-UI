// heavyWorker.js
self.onmessage = (e) => {
  const { task } = e.data;

  // Simulate heavy calculation
  let result = 0;
  for (let i = 0; i < 1e9; i++) {
    result += i;
  }

  // Send the result back to the main thread
  postMessage({ task, result });
};
