import React from 'react'
import SimulationModule from '../Components/SimulationModule'
import UploadModule from '../Components/UploadModule'
import { useState } from 'react'
import NewOpsModule from '../Components/NewOpsModule'
import Scoreboard from '../Components/Scoreboard'

const MainFrame = () => {
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();
  const [sliderValue, setSliderValue] = useState([]);

  const handleLambdaOutput = (output) => {
    setLambdaOutput(output);
    console.log(lambdaOutput);
  }

  const handleSliderValue = (data) => {
    setSliderValue(data);
  }

  return (
    <div id='mainFrameLayout'>
      <div id='first-column-mainframe'>
        <UploadModule />
        <NewOpsModule handleSliderValue={handleSliderValue} />
      </div>
      <div id='second-column-mainframe'>
        <SimulationModule handleLambdaOutput={handleLambdaOutput} sliderValue={sliderValue} />
        <Scoreboard lambdaOutput={lambdaOutput} />
      </div>
    </div>
  )
}

export default MainFrame
