import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import MyResponsiveBar from './SimulationBarChart';

const SimulationModule = ({ lambdaOutput }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState([[]]);
  const [largestValue, setLargestValue] = useState(100);

  useEffect(() => {
    if (lambdaOutput) {
      setData(lambdaOutput);
      const maxValue = lambdaOutput
        .flatMap(array => array.map(obj => obj.values))
        .reduce((max, value) => Math.max(max, value), 0);
      setLargestValue(maxValue);
    }
  }, [lambdaOutput]);

  useEffect(() => {
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
      }, 200);
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
            <MyResponsiveBar largestValue={largestValue} data={data[currentIndex].slice(0, data[0].length - 2 < 0 ? 0: data[0].length - 2)} />
          </div>
          <div id='simulation-bar-chart-right'>
            <MyResponsiveBar largestValue={largestValue} data={data[currentIndex].slice(data[0].length - 2 < 0 ? 0: data[0].length - 2, data[0].length)} />
          </div>
        </div>
        <button className='button' onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <ReactSlider
          className='customSlider'
          valueLabelDisplay="on"
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={1}
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
