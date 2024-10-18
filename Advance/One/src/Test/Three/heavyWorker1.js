export const workerFunction = () => {
  self.onmessage = (event) => {
    const { type, payload } = event.data;

    switch (type) {
      case "HEAVY_CALCULATION": {
        // Simulate a heavy calculation
        const start = Date.now();
        while (Date.now() - start < 5000) {
          // Simulating heavy work
        }
        // const random = Math.floor(Math.random() * 1000);
        // console.log("random", random);
        // self.postMessage({
        //   type: "HEAVY_CALCULATION_DONE",
        //   result: `Pune ${random}`,
        // });

        // Use payload to generate result, for example:
        console.log("payload", payload);
        const result = payload.someData
          ? `Processed: ${payload.someData}`
          : "Default Result";

        self.postMessage({ type: "HEAVY_CALCULATION_DONE", result: result });
        break;
      }

      default: {
        self.postMessage({ type: "ERROR", message: "Unknown task" });
        break;
      }
    }
  };
};
