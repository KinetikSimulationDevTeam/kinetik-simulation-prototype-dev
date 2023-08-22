const downloadCsv = function (data, filename) {
  // Creating a Blob for having a csv file format
  // and passing the data with type
  const blob = new Blob([data], { type: "text/csv" });

  // Creating an object for downloading url
  const url = window.URL.createObjectURL(blob);

  // Creating a link element and configuring it
  const link = document.createElement("a");
  link.href = url;
  link.download = filename; // Set the filename for the download

  // Simulating a click on the link to trigger the download
  link.click();

  // Clean up by revoking the object URL
  window.URL.revokeObjectURL(url);
};

export default downloadCsv;
