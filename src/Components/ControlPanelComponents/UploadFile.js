import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import CsvToArray from "./CsvToArray";
import alertify from "alertifyjs";

const UploadFile = (props) => {
  const fileReader = useRef(new FileReader());

  const handleFileRead = () => {
    const content = fileReader.current.result;
    CsvToArray(content);
    localStorage.setItem("marketingInputFile", null);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      localStorage.setItem("fileName", e.target.files[0].name);
      fileReader.current.onloadend = handleFileRead;
      fileReader.current.readAsText(uploadedFile);
      props.handleUploadCount();
      props.startSimulationButtonFlash();
      props.handleFileNameUpdate(e.target.files[0].name);
    } else {
      alertify.error("Please select a file");
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        onClick={handleButtonClick}
        variant="outlined"
        size="medium"
        sx={{ fontSize: "10px", width: "100%", whiteSpace: "nowrap" }}
      >
        Upload Statistics
      </Button>
    </Box>
  );
};

export default UploadFile;
