importScripts("https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js"); // Import xlsx library

let startTime;

self.onmessage = function (event) {
  const { file } = event.data;
  startTime = Date.now();
  readFileFully(file);
};

function readFileFully(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const buffer = e.target.result;

    try {
      const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Post the entire parsed data at once
      const endTime = Date.now();
      const duration = endTime - startTime;
      postMessage({ chunk: jsonData, finished: true, duration });
    } catch (error) {
      postMessage({ finished: true, error: error.message });
    }
  };

  reader.onerror = function (error) {
    postMessage({ finished: true, error: error.message });
  };

  reader.readAsArrayBuffer(file); // Read the whole file at once
}
