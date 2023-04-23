import React, { useState, useEffect } from 'react';
import ScenerioSlider from './ScenerioSlider';

const ScenerioSliders = (props) => {
  // This state will store the response from the lambda function
  const [data, setData] = useState(null);
  // This state will store the value of the slider
  const [sliderValue, setSliderValue] = useState([]);

  useEffect(() => {
    const refreshPage = () => {
      const jsonData = JSON.parse(localStorage.getItem('KinetikDataSet'));
      setData(jsonData, change(jsonData));
    };

    const change = async (jsonData) => {
      if (jsonData) {
        let array = [];
        for (let i = 0; i < jsonData['means'].length; i++) {
          array[i] = jsonData['means'][i];
        }
        await setSliderValue(array);
        props.handleSliderValue(array);
      }
    };

    refreshPage();
  }, [props.uploadCount])

  /*
    Description: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.
    
    Arguments: None

    Return Type: None
  */
  function onClick() {
    props.handleSliderValue(sliderValue);
  }

  /*
    Description: This function is used to get the data from the local storage when the page refresh and set the data state with that data.

    Arguments: None

    Return Type: None
  */
  const refreshPage = async () => {
    const jsonData = JSON.parse(localStorage.getItem('KinetikDataSet'));
    await setData(jsonData, change(jsonData));
  }

  /*
    Description: This function is used to get the current slider value and set the sliderValue state with that value.

    Arguments: None

    Return Type: None
  */
  async function change(jsonData) {
    if (jsonData) {
      let array = [];
      for (let i = 0; i < jsonData['means'].length; i++) {
        array[i] = jsonData['means'][i];
      }
      await setSliderValue(array, props.handleSliderValue(sliderValue));
    }
  }

  useEffect(() => {
    refreshPage();
  }, []);

  /*
    Description: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.

    Arguments: None

    Return Type: array
  */
  const handleSliderChange = async (newValue, index) => {
    await setSliderValue((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };

  if (!data) {
    return (
      <div>
        <p>Please Upload a File Above</p>
      </div>
    );
  } else {
    const numSliders = data['sources'].length;
    const sliders = Array.from({ length: numSliders }, (_, i) => (
      <ScenerioSlider
        key={i}
        name={data['sources'][i]}
        mean={data['means'][i]}
        onSliderChange={(newValue) => handleSliderChange(newValue, i)}
      />
    ));
    return (
      <div style={{ height: '45vh', overflow: 'auto' }}>
        {sliders}
        <button className='button' type='submit' onClick={onClick}> Confirm </button>
      </div>
    )
  }
};


export default ScenerioSliders;
