importScripts("https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js"); // Import xlsx library

let startTime;

self.onmessage = function (event) {
  const { file, chunkSize } = event.data;
  console.log("started");
  console.log("file size: ", file.size);
  startTime = Date.now(); // Start time when the file processing begins
  readFileInChunks(file, chunkSize);
};

function readFileInChunks(file, chunkSize) {
  const reader = new FileReader();
  let offset = 0;

  reader.onload = function (e) {
    const buffer = e.target.result; // This is an ArrayBuffer

    try {
      // Use ArrayBuffer for parsing
      const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      console.log(`🚀 ~ readFileInChunks ~ firstSheetName:`, firstSheetName);
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      postMessage({ chunk: jsonData, finished: false });

      console.log("offset = ", offset);
      console.log("chunkSize = ", chunkSize);
      console.log("file.size = ", file.size);

      if (offset < file.size) {
        console.log("running chunk (start) = ", offset);
        offset += chunkSize;
        reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize)); // Continue reading
        console.log("running chunk (end) = ", offset);
      } else {
        console.log("running last chunk = ", offset);
        const endTime = Date.now(); // Capture end time when processing is complete
        const duration = endTime - startTime;
        console.log("End");
        postMessage({ finished: true, duration }); // Send duration back to the main thread
      }
    } catch (error) {
      postMessage({ finished: true, error: error.message }); // Send error back
    }
  };

  reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize)); // Initial read
}
