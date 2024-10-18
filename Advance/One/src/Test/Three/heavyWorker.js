// heavyWorker.js
self.onmessage = () => {
  // Simulate heavy calculation (e.g., blocking for 5 seconds)
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // Simulating heavy work (5 seconds)
  }

  // Send message back to main thread after the calculation is done
  self.postMessage("done");
};
