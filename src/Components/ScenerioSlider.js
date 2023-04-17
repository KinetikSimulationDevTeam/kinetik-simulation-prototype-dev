import React, { useState } from 'react';
import ReactSlider from 'react-slider';

const ScenerioSlider = ({ name, mean, onSliderChange }) => {
  const [value, setValue] = useState(mean);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    onSliderChange(newValue); // call the callback function to update the state in ScenerioSliders
  };

  return (
    <div>
      <p id="scenerio-slider-name"> {name} </p>
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={mean}
        min={0}
        max={2 * mean}
        defaultValue={mean}
        onChange={handleSliderChange}
      />
      <p>Value: {value}</p>
    </div>
  );
};

export default ScenerioSlider
