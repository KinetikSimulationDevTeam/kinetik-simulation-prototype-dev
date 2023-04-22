import {React, useEffect, useState} from 'react'
import ScenerioSliders from './ScenerioSliders'

const NewOpsModule = (props) => {
  // This state will store the response from the lambda function
  const [sliderValue, setSliderValue] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
  const handleSliderValue = (data) => {
    setSliderValue(data, props.handleSliderValue(sliderValue));
  }

  useEffect(() => {
    setUploadCount(props.uploadCount);
  }, [props.uploadCount])

  return (
    <div id='new-ops-module-layout'>
      <h3 className='title'> Scenerio Analysis </h3>
      <ScenerioSliders handleSliderValue={handleSliderValue} uploadCount={uploadCount} />
    </div>
  )
}

export default NewOpsModule
