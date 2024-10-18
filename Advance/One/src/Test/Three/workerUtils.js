export const createWorker = (workerFunction) => {
  const blob = new Blob([`(${workerFunction.toString()})()`], {
    type: "application/javascript",
  });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
};
