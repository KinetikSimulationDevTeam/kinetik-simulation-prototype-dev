import {React, useEffect, useState} from 'react'
import ScenerioSliders from '../Components/Sliders'

/*
    Description: This component is used to display the sliders for the scenerio analysis.

    Arguments: handleSliderValue: callback function to update the state in ScenerioSliders

    Return Type: None
*/
const NewOpsModule = (props) => {
  // This state will store the response from the lambda function
  const [sliderValue, setSliderValue] = useState([0,0,0,0,0,0]);
  const [uploadCount, setUploadCount] = useState(0);

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
  const handleSliderValue = async (data) => {
    await setSliderValue(data, props.handleSliderValue(sliderValue));
  }

  useEffect(() => {
    setUploadCount(props.uploadCount);
  }, [props.uploadCount])

  return (
    <div id='new-ops-module-layout'>
      <h3 id='scoreboard-title'> Scenario Analysis </h3>
      <ScenerioSliders handleSliderValue={handleSliderValue} uploadCount={uploadCount} />
    </div>
  )
}

export default NewOpsModule
