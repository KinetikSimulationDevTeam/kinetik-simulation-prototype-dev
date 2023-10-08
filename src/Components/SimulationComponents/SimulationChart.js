import React from "react";
import MyResponsiveBar from "./SimulationBarChart";
import SimulationChordChart from "./SimulationChordChart";

const SimulationChart = ({
  graphSelection,
  data,
  currentIndex,
  chordData,
  chordKey,
  largestValue,
  getChordDataForCurrentIndex,
}) => {
  return (
    <div id="simulation-bar-chart">
      {graphSelection === "bar-chart" && (
        <MyResponsiveBar
          largestValue={largestValue}
          data={data[currentIndex]}
        />
      )}
      {graphSelection === "chord-chart" && chordData && (
        <SimulationChordChart
          data={getChordDataForCurrentIndex()}
          key={chordKey}
        />
      )}
    </div>
  );
};

export default SimulationChart;
