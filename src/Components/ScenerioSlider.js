import React, { useState } from 'react';
import ReactSlider from 'react-slider';

const ScenerioSlider = ({ name, mean, onSliderChange }) => {
  // This state will store the value of the slider
  const [value, setValue] = useState(mean);

  /*
    Description: This function is used to update the state of the slider when the user changes the value of the slider.

    Arguments: newValue (the value of the slider)

    Return Type: None
  */
  const handleSliderChange = async (newValue) => {
    await setValue(newValue);
    await onSliderChange(newValue); // call the callback function to update the state in ScenerioSliders
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
