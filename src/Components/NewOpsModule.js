import {React, useState} from 'react'
import ScenerioSliders from './ScenerioSliders'

const NewOpsModule = () => {
  const [sliderValue, setSliderValue] = useState([]);

  return (
    <div id='new-ops-module-layout'>
      <h3 className='title'> Scenerio Analysis </h3>
      <ScenerioSliders />
    </div>
  )
}

export default NewOpsModule
