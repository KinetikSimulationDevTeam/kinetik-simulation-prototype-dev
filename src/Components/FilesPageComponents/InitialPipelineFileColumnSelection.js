import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const InitialPipelineFileColumnSelection = (props) => {
  const { onClose, selectedValues, open, file } = props;

  const handleClose = () => {
    onClose(selectedValues);
  };

  const handleListItemClick = (event) => {
    selectedValues = [...selectedValues, event.target.value];
  };

  const paseFirstRow = (file) => {
    try {
      let array = file.toString().split("\n");
      const firstRow = array[0].split(",");
      return firstRow;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Select sensitive columns to anonymize:</DialogTitle>
      <RadioGroup
        value={selectedValues}
        onChange={handleListItemClick}
        sx={{ margin: "1vw", borderRadius: "5px" }}
      >
        {paseFirstRow(file)
          .filter((column) => column.trim() !== "")
          .map((column, index) => {
            const uniqueKey = `${column}_${index}`;
            return (
              <FormControlLabel
                key={uniqueKey}
                value={column}
                control={<Checkbox />}
                label={column}
                sx={{ padding: "0 1vw 1vh 1vw" }}
              />
            );
          })}
      </RadioGroup>
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleClose()}
        sx={{ width: "70%", margin: "5% 15%" }}
      >
        Select
      </Button>
    </Dialog>
  );
};

export default InitialPipelineFileColumnSelection;
