import React from "react";
import ChordChartIcon from "../../Images/ChordChartIcon.png";
import BarChartIcon from "../../Images/BarChartIcon.png";

const SimulationTitle = ({
  currentIndex,
  graphSelection,
  handleGraphSelection,
}) => {
  return (
    <div>
      <div id="simulation-title">
        <h3 className="title"> Pipeline Dynamics </h3>
        <h3> Week {currentIndex + 1} </h3>
        {graphSelection === "bar-chart" && (
          <img
            className="simulation-chart-icon"
            title="Click to show movement flow chart"
            src={ChordChartIcon}
            alt="chord-chart"
            onClick={handleGraphSelection}
          />
        )}
        {graphSelection === "chord-chart" && (
          <img
            className="simulation-chart-icon"
            title="Click to show stages bar chart"
            src={BarChartIcon}
            alt="chord-chart"
            onClick={handleGraphSelection}
          />
        )}
      </div>
    </div>
  );
};

export default SimulationTitle;
