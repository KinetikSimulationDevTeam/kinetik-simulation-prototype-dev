import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import MyResponsiveBar from './SimulationBarChart';

const SimulationModule = ({ lambdaOutput }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState([[]]);

  useEffect(() => {
    setData(lambdaOutput == undefined ? [[]] : lambdaOutput);
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentIndex < data.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setSliderValue((prevValue) => prevValue + 1);
        } else {
          setCurrentIndex(0);
          setSliderValue(0);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [currentIndex, data.length, isPlaying]);

  const handleSliderChange = (value) => {
    setCurrentIndex(value);
    setSliderValue(value);
  };

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div id='simulation-module-layout'>
      <div id='simulation-title'>
        <h3 className='title'> Simulation/History </h3>
        <h4> Week {currentIndex + 1} </h4>
      </div>
      <div>
        <div id='simulation-bar-chart'>
          <div id='simulation-bar-chart-left'>
            <MyResponsiveBar data={data[currentIndex].slice(0, data[0].length - 2 < 0 ? 0: data[0].length - 2)} />
          </div>
          <MyResponsiveBar data={data[currentIndex].slice(data[0].length - 2 < 0 ? 0: data[0].length - 2, data[0].length)} />
        </div>
        <button className='button' onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={data.length - 1}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default SimulationModule;
