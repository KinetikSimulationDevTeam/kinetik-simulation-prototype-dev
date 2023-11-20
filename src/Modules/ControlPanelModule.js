import React, { useState } from "react";
import ControlPanelFileSelections from "../Components/ControlPanelComponents/ControlPanelFileSelections";
import SimulationParamsSelection from "../Components/ControlPanelComponents/SimulationParamsSelection";
import { Box } from "@mui/material";

/*
    Description: This component is used to display the control panel.

    Arguments: handleLambdaOutput: callback function to update the state in Simulation.js

              handleUploadCount: callback function to update the state in Simulation.js
                
    Return Type: None
*/
const UploadModule = ({
  handleLambdaOutput,
  handleUploadCount,
  handleStartSimulationButtonFlashing,
}) => {
  //uploaded file name
  const [fileName, setFileName] = useState(null);

  const handleStartSimulationButtonFlash = () => {
    handleStartSimulationButtonFlashing();
  };

  return (
    <div id="upload-module-layout">
      <p className="title"> Control Panel </p>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "5%" }}>
        <SimulationParamsSelection />
        <ControlPanelFileSelections
          startSimulationButtonFlash={handleStartSimulationButtonFlash}
          handleUploadCount={handleUploadCount}
          handleFileNameUpdate={setFileName}
        />
      </Box>
      <span style={{ textAlign: "start", fontSize: "small" }}>
        <span style={{ color: "purple" }}>Current Input File: </span>
        {fileName === null
          ? localStorage.getItem("fileName")
            ? localStorage.getItem("fileName")
            : "None"
          : fileName}
      </span>
    </div>
  );
};

export default UploadModule;
