importScripts("https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js"); // Import xlsx library

let startTime;

self.onmessage = function (event) {
  const { file, chunkSize } = event.data;
  startTime = Date.now(); // Start time when the file processing begins
  readFileInChunks(file, chunkSize);
};

function readFileInChunks(file, chunkSize) {
  const reader = new FileReader();
  let offset = 0;

  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log("file size: ", file.size);

    postMessage({ chunk: jsonData, finished: false });

    if (offset < file.size) {
      console.log("running chunk = ", offset);
      offset += chunkSize;
      reader.readAsBinaryString(file.slice(offset, offset + chunkSize));
    } else {
      console.log("running last chunk = ", offset);
      const endTime = Date.now(); // Capture end time when processing is complete
      const duration = endTime - startTime;
      postMessage({ finished: true, duration }); // Send duration back to the main thread
    }
  };

  reader.readAsBinaryString(file.slice(offset, offset + chunkSize));
}
