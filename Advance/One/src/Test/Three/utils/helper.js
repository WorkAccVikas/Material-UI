/**
 * Simulates a heavy calculation for a specified duration.
 * This function blocks the UI thread, which can lead to a poor user experience
 * if used in production code. It is recommended to use asynchronous methods
 * or Web Workers for long-running tasks in real applications.
 *
 * @param {number} seconds - The duration in seconds for which the calculation
 *                            should run.
 * @throws {Error} Throws an error if the input is not a positive number.
 */
export const heavyCalculation = (seconds) => {
  if (typeof seconds !== "number" || seconds <= 0) {
    throw new Error("Input must be a positive number.");
  }

  const start = Date.now();

  // Block the UI thread for the specified duration
  while (Date.now() - start < seconds * 1000) {
    // Busy-wait loop, intentionally left empty
  }
};

/**
 * Performs a computationally intensive task for a specified duration.
 * Optionally, a provided function can be executed along with any additional arguments.
 * This implementation blocks the UI thread, potentially leading to a suboptimal user experience.
 * For production code, consider using asynchronous techniques like Web Workers or async functions
 * to handle lengthy operations without affecting the UI responsiveness.
 *
 * @param {number} durationInSeconds - The time in seconds for which the computation should be performed.
 * @param {function} [taskFunction] - (Optional) The function to execute during the computation. If not provided, no function is executed.
 * @param {...any} [functionArgs] - (Optional) The arguments to pass to the task function.
 * @throws {Error} Throws an error if the duration is not a positive number or if taskFunction is provided but is not a valid function.
 * @returns {*} Returns the result of the taskFunction if provided, otherwise undefined.
 */
export const performHeavyTask = (
  durationInSeconds,
  taskFunction,
  ...functionArgs
) => {
  if (typeof durationInSeconds !== "number" || durationInSeconds <= 0) {
    throw new Error("Duration must be a positive number.");
  }
  if (taskFunction && typeof taskFunction !== "function") {
    throw new Error("Task must be a function.");
  }

  const startTime = Date.now();

  // Block the UI thread for the specified duration
  while (Date.now() - startTime < durationInSeconds * 1000) {
    // Optionally execute the task function with the provided arguments
  }

  return taskFunction ? taskFunction(...functionArgs) : undefined;
};
