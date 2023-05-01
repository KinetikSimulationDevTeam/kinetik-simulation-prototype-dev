import React from 'react'
import SimulationModule from '../Modules/SimulationModule'
import ControlPanelModule from '../Modules/ControlPanelModule'
import { useState, useEffect } from 'react'
import NewOpsModule from '../Modules/NewOpsModule'
import Scoreboard from '../Modules/ScoreboardModule'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Navbar from '../Components/NavigationBar'

const MainFrame = () => {
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();
  const [sliderValue, setSliderValue] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('KinetikDataSet') === null) {
      alertify.alert('Welcome to Kinetik Simulation', 'Please upload the file to begin!', function () {
        alertify.success('For input template, please see the template link');
      });
    }
  }, []);

  const handleLambdaOutput = async (output) => {
    await setLambdaOutput(output);
  }

  const handleSliderValue = async (data) => {
    await setSliderValue(data);
  }

  const handleUploadCount = async () => {
    await setUploadCount(uploadCount + 1);
  }

  return (
    <div>
      <Navbar />
      <div id='mainFrameLayout'>
        <div id='first-column-mainframe'>
          <ControlPanelModule handleUploadCount={handleUploadCount} />
          <NewOpsModule handleSliderValue={handleSliderValue} uploadCount={uploadCount} />
        </div>
        <div id='second-column-mainframe'>
          <SimulationModule handleLambdaOutput={handleLambdaOutput} sliderValue={sliderValue} />
          <Scoreboard lambdaOutput={lambdaOutput} />
        </div>
      </div>
    </div>
  )
}

export default MainFrame
