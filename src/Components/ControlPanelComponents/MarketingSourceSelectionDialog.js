import {
  Button,
  Dialog,
  Select,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import alertify from "alertifyjs";

const MarketingSourceSelectionDialog = ({
  files,
  open,
  close,
  handleUploadCount,
  startSimulationButtonFlash,
  handleFileNameUpdate,
}) => {
  const [selectedFile, setSelectedFile] = useState("None");
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleChange = (event) => {
    // Set the selected file body
    setSelectedFile(event.target.value);

    // Find the selected file object from the files array using the selected value
    const file = files.find((f) => f.body === event.target.value);

    // Set the selected file name
    if (file) {
      setSelectedFileName(file.title);
    } else {
      setSelectedFileName(null);
    }
  };

  const handleConfirmButtonClick = (e) => {
    e.preventDefault();

    if (selectedFile === null) {
      alertify.error("Error: No file selected.");
      return;
    }

    localStorage.setItem("KinetikDataSet", selectedFile);
    localStorage.setItem("fileName", selectedFileName);
    // set marketing input file to null since no marketing input file is selected
    localStorage.setItem("marketingInputFile", null);
    alertify.success("Successfully select a file from the database.");
    alertify.success('Please click "Start Simulation" to run the simulation.');
    handleUploadCount();
    handleFileNameUpdate(selectedFileName);
    startSimulationButtonFlash();
    handleClose();
  };

  const handleClose = () => {
    close();
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Select T0 From Database</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: "1", width: "100%" }}>
          <InputLabel htmlFor="dialog-native">File</InputLabel>
          <Select
            value={selectedFile}
            onChange={handleChange}
            input={<OutlinedInput label="File" id="dialog-native" />}
          >
            {files.map((file) => (
              <option key={file.id} value={file.body}>
                {"File Name: " +
                  file.title +
                  ", Time: " +
                  new Date(file.createdAt).toLocaleString()}
              </option>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirmButtonClick}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarketingSourceSelectionDialog;
