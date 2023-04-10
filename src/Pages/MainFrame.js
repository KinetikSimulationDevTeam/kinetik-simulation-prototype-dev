import React from 'react'
import SimulationModule from '../Components/SimulationModule'
import UploadModule from '../Components/UploadModule'
import { useState } from 'react'
import NewOpsModule from '../Components/NewOpsModule'

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
        <UploadModule handleLambdaOutput={handleLambdaOutput} />
        <NewOpsModule />
      </div>
      <div>
        <SimulationModule lambdaOutput={lambdaOutput} />
      </div>
    </div>
  )
}

export default MainFrame
