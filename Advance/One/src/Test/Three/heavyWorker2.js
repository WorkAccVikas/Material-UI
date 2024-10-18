export const workerFunction = () => {
  self.onmessage = (event) => {
    console.log(event);
    const { type, payload } = event.data;

    switch (type) {
      case "HEAVY_CALCULATION": {
        try {
          // Simulate a heavy calculation
          const start = Date.now();
          while (Date.now() - start < 5000) {
            // Simulating heavy work, replace with actual calculation logic
          }

          // Use payload to generate result, for example:
          if (!payload || !payload.someData) {
            throw new Error("Invalid payload: missing someData");
          }

          // console.log("m = ", m); // manually generate error

          const random = Math.floor(Math.random() * 1000);

          const result = `Processed: ${payload.someData} #${random}`;
          self.postMessage({ type: "HEAVY_CALCULATION_DONE", result });
        } catch (error) {
          self.postMessage({ type: "ERROR", message: error.message });
        }
        break;
      }

      default: {
        self.postMessage({ type: "ERROR", message: "Unknown task type" });
        break;
      }
    }
  };
};
