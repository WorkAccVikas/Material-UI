export const workerFunction = () => {
  const HEAVY_ACTION = {
    HEAVY_ACTION1: "HEAVY_ACTION1",
    HEAVY_ACTION2: "HEAVY_ACTION2",
  };

  self.onmessage = (event) => {
    console.log(event);
    const { type, payload } = event.data;

    switch (type) {
      case HEAVY_ACTION.HEAVY_ACTION1: {
        console.log("case 1 : age");
        try {
          if (!payload || !payload.data) {
            throw new Error("Invalid payload: missing data");
          }

          console.log("payload = ", payload);

          // Simulate a heavy calculation
          const start = Date.now();
          while (Date.now() - start < 5 * 1000) {
            // Simulating heavy work, replace with actual calculation logic
          }

          const result =
            payload.data?.reduce((acc, curr) => acc + curr, 0) ||
            Math.floor(Math.random() * 1000);

          self.postMessage({
            type: HEAVY_ACTION.HEAVY_ACTION1,
            result,
          });
        } catch (error) {
          self.postMessage({
            type: "ERROR",
            message: error.message,
          });
        }
        break;
      }

      case HEAVY_ACTION.HEAVY_ACTION2: {
        console.log("case 2 : salary");
        try {
          if (!payload || !payload.data) {
            throw new Error("Invalid payload: missing data");
          }

          console.log("payload = ", payload);

          // Simulate a heavy calculation
          const start = Date.now();
          while (Date.now() - start < 5 * 1000) {
            // Simulating heavy work, replace with actual calculation logic
          }

          const result =
            payload.data?.reduce((acc, curr) => acc + curr, 0) ||
            Math.floor(Math.random() * 1000);

          self.postMessage({
            type: HEAVY_ACTION.HEAVY_ACTION2,
            result,
          });
        } catch (error) {
          self.postMessage({
            type: "ERROR",
            message: error.message,
          });
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
