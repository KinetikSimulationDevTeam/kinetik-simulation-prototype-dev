import {React, useState} from 'react'
import ScenerioSliders from './ScenerioSliders'

const NewOpsModule = (props) => {
  const [sliderValue, setSliderValue] = useState([]);

  const handleSliderValue = (data) => {
    setSliderValue(data);
    props.handleSliderValue(sliderValue);
  }

  return (
    <div id='new-ops-module-layout'>
      <h3 className='title'> Scenerio Analysis </h3>
      <ScenerioSliders handleSliderValue={handleSliderValue} />
    </div>
  )
}

export default NewOpsModule
