import React from 'react'
import ReactSlider from 'react-slider';

const NewOpsModule = () => {
  return (
    <div id='new-ops-module-layout'>
      <h3 className='title'> Scenerio Analysis </h3>
      <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={100}
        />
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={100}
        />
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={100}
        />
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={100}
        />
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={100}
        />
    </div>
  )
}

export default NewOpsModule
