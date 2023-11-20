import React from "react";
import { Button } from "@mui/material";
import SampleFile from "../../InputTemplate/SampleFile";
import alertify from "alertifyjs";

const FileSample = (props) => {
  const onClickSampleFileButton = (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(SampleFile);
    localStorage.setItem("KinetikDataSet", jsonString);
    localStorage.setItem("fileName", "Sample File");
    localStorage.setItem("marketingInputFile", null);
    props.handleUploadCount();
    props.startSimulationButtonFlash();
    props.handleFileNameUpdate("Sample File");
    alertify.success("Successfully selected the sample file.");
    alertify.success('Please click "Start Simulation" to run the simulation.');
  };

  return (
    <Button
      onClick={onClickSampleFileButton}
      variant="contained"
      color="success"
      size="medium"
      sx={{ fontSize: "10px", width: "100%", whiteSpace: "nowrap" }}
    >
      Use Sample File
    </Button>
  );
};

export default FileSample;
