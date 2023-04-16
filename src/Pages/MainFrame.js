import React from 'react'
import SimulationModule from '../Components/SimulationModule'
import UploadModule from '../Components/UploadModule'
import { useState } from 'react'
import NewOpsModule from '../Components/NewOpsModule'
import Scoreboard from '../Components/Scoreboard'

const MainFrame = () => {
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();

  const handleLambdaOutput = (output) => {
    setLambdaOutput(output);
    console.log(lambdaOutput);
  }

  return (
    <div id='mainFrameLayout'>
      <div id='first-column-mainframe'>
        <UploadModule/>
        <NewOpsModule />
      </div>
      <div id='second-column-mainframe'>
        <SimulationModule handleLambdaOutput={handleLambdaOutput} />
        <Scoreboard lambdaOutput={lambdaOutput} />
      </div>
    </div>
  )
}

export default MainFrame
