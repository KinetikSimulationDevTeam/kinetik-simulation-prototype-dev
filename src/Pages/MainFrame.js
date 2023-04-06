import React from 'react'
import SimulationModule from '../Components/SimulationModule'
import UploadModule from '../Components/UploadModule'
import { useState } from 'react'

const MainFrame = () => {
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();

  const handleLambdaOutput = (output) => {
    setLambdaOutput(output);
    console.log(lambdaOutput);
  }

  return (
    <div id='mainFrameLayout'>
      <UploadModule handleLambdaOutput={handleLambdaOutput} />
      <SimulationModule lambdaOutput={lambdaOutput} />
    </div>
  )
}

export default MainFrame
