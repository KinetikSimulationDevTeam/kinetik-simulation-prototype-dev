import React, { useState } from 'react';
import ReactSlider from 'react-slider';

/*
    Description: This component is used to display the sliders for the scenerio analysis.

    Arguments: name: name of the slider

              mean: mean value of the slider

              onSliderChange: callback function to update the state in ScenerioSliders

    Return Type: None
*/
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
        className="newops-slider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={mean}
        min={-90}
        max={300}
        defaultValue={mean}
        onChange={handleSliderChange}
      />
      <p>Value: {value}%</p>
    </div>
  );
};

export default ScenerioSlider
