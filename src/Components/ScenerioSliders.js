import React, { useState, useEffect } from 'react';
import ScenerioSlider from './ScenerioSlider';

const ScenerioSliders = (props) => {
    const [data, setData] = useState(null);
    const [sliderValue, setSliderValue] = useState([]);
    const [numSliders, setNumSliders] = useState(0);
    const [sliders, setSliders] = useState();

    useEffect(() => {
      if(localStorage.getItem('KinetikDataSet') != null){
        setData(JSON.parse(localStorage.getItem('KinetikDataSet')));
        if (data) {
          let array = [];
          for (let i = 0; i < data['means'].length; i++) {
            array[i] = data['means'][i];
          }
          setSliderValue(array);
          props.handleSliderValue(sliderValue);
        }
      }
    }, [localStorage.getItem('KinetikDataSet')])

    useEffect(() => {
      if (data) {
        setNumSliders(data['sources'].length);
      }
    }, [data]);

    useEffect(() => {
      const sliders = Array.from({ length: numSliders }, (_, i) => (
        <ScenerioSlider
          key={i}
          name={data['sources'][i]}
          mean={data['means'][i]}
          onSliderChange={(value) => handleSliderChange(value, i)}
        />      
      ));
      setSliders(sliders);
    }, [numSliders, data]);

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
      return (
        <div  style={{ height: '45vh', overflow: 'auto' }}>
          {sliders}
        </div>
      )
    }
};

export default ScenerioSliders;
