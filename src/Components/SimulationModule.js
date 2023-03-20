import React from 'react'
import ReactSlider from "react-slider";
import CanvasJSReact from '../canvasjs.react';
import SimulationRunMenu from './SimulationRunMenu';

//establish connection to CanvasJs Chart
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SimulationModule = () => {
  //bar chart data and specification
  const options = {
    height: 220,
    data: [{
      type: "column",
      dataPoints: [
        { label: "E", y: 100 },
        { label: "Q", y: 150 },
        { label: "D", y: 250 },
        { label: "P", y: 300 },
        { label: "I", y: 280 },
        { label: "N", y: 249 },
        { label: "C", y: 20 },
        { label: "G", y: 19 }
      ]
    }]
  }

  return (
    <div id='simulation-module-layout'>
      <h3 className='title'> Simulation/History </h3>
      <CanvasJSChart options = {options} />
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={10}
        min={0}
        max={100}
      />
    </div>
  )
}

export default SimulationModule
