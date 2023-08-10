import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import CsvLogo from "../../Images/CsvLogo.png";

const FileTypeSelectionDialog = ({ onClose, open }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Select Upload File Type:</DialogTitle>
      <RadioGroup
        value={selectedValue}
        onChange={handleListItemClick}
        sx={{ margin: "1vw", borderRadius: "5px" }}
      >
        <FormControlLabel
          value="pipelineSummary"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={CsvLogo}
                alt="CSV Logo"
                style={{ marginRight: "8px", width: "40px", height: "40px" }}
              />
              Pipeline Summary CSV
            </div>
          }
          sx={{ padding: "0 1vw 1vh 1vw" }}
        />

        <FormControlLabel
          value="initialPipeline"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={CsvLogo}
                alt="CSV Logo"
                style={{ marginRight: "8px", width: "40px", height: "40px" }}
              />
              Initial Pipeline CSV
            </div>
          }
          sx={{ padding: "0 1vw 1vh 1vw" }}
        />
      </RadioGroup>
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleClose()}
        sx={{ width: "70%", margin: "5% 15%" }}
      >
        Submit
      </Button>
    </Dialog>
  );
};

export default FileTypeSelectionDialog;
