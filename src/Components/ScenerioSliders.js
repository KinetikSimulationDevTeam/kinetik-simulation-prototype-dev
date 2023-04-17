import React, { useState, useEffect } from 'react';
import ScenerioSlider from './ScenerioSlider';

const ScenerioSliders = (props) => {
    const [data, setData] = useState(null);
    const [sliderValue, setSliderValue] = useState([]);
  
    useEffect(() => {
        const jsonData = JSON.parse(localStorage.getItem('KinetikDataSet'));
        setData(jsonData);
        if (jsonData) {
          let array = [];
          for (let i = 0; i < jsonData['means'].length; i++) {
            array[i] = jsonData['means'][i];
          }
          setSliderValue(array);
          props.handleSliderValue(sliderValue);
        }
    }, []);

    const handleSliderChange = (newValue, index) => {
        setSliderValue((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = newValue;
          return newValues;
        });
        props.handleSliderValue(sliderValue);
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
          onSliderChange={(value) => handleSliderChange(value, i)}
        />      
      ));
      return (
              <div  style={{ height: '45vh', overflow: 'auto' }}>
                {sliders}
              </div>
      )
    }
};
  

export default ScenerioSliders;
