import React from "react";

const SimulationButtons = ({
  onClickExportScenario,
  callLambdaFunction,
  startSimulationButtonFlash,
}) => {
  return (
    <div id="simulation-buttons-layout">
      <button
        className="button"
        style={{
          backgroundColor: startSimulationButtonFlash ? "goldenrod" : "",
        }}
        onClick={() =>
          callLambdaFunction(
            localStorage.getItem("KinetikDataSet"),
            localStorage.getItem("marketingInputFile") === null
              ? null
              : localStorage.getItem("marketingInputFile")
          )
        }
      >
        {" "}
        Start Simulation{" "}
      </button>
      <button className="button" onClick={onClickExportScenario}>
        Export Scenario
      </button>
    </div>
  );
};

export default SimulationButtons;
