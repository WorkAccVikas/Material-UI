// src/utils/helper.js
export function performHeavyTask(param1, fn, data) {
  // Some heavy calculation logic
  return data.map((item) => fn(item) * param1);
}

// utils/helper.js
export const performHeavyCalculation = (data, second = 5) => {
  // Simulate a heavy calculation
  const start = Date.now();
  while (Date.now() - start < second * 1000) {
    // Simulating heavy work; replace with actual calculation logic
  }

  // Perform the actual calculation
  return (
    data.reduce((acc, curr) => acc + curr, 0) ||
    Math.floor(Math.random() * 1000)
  );
};
