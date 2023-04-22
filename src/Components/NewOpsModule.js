import {React, useState} from 'react'
import ScenerioSliders from './ScenerioSliders'

const NewOpsModule = (props) => {
  // This state will store the response from the lambda function
  const [sliderValue, setSliderValue] = useState([]);

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
  const handleSliderValue = (data) => {
    setSliderValue(data, props.handleSliderValue(sliderValue));
  }

  return (
    <div id='new-ops-module-layout'>
      <h3 className='title'> Scenerio Analysis </h3>
      <ScenerioSliders handleSliderValue={handleSliderValue} />
    </div>
  )
}

export default NewOpsModule
