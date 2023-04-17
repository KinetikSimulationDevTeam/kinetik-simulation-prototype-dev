import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import MyResponsiveBar from './SimulationBarChart';
import { API } from 'aws-amplify';

const SimulationModule = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState([[]]);
  const [largestValue, setLargestValue] = useState(100);
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();
  const [updatedSliderValue, setUpdatedSliderValue] = useState([]);

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

  const callLambdaFunction = async (input) => {
    try {
      setUpdatedSliderValue(props.sliderValue);
      console.log("simulationmodule slider value:");
      console.log(updatedSliderValue);
      // const jsonObject = JSON.parse(input);
      // const currentMeans = jsonObject['means']
      // for(let i = 0; i < currentMeans.length; i++) {
      //   currentMeans[i] = 
      // }
      const response = await API.post('getSimulationOutput', '/simulation',{
        body: input
      });
      console.log("Lambda Function Input Sent");
      console.log(response);

      // Set the state of lambdaOutput with the response
      setLambdaOutput(response === undefined ? response[0] : response);
      props.handleLambdaOutput(response === undefined ? response[0] : response);
      console.log("Lambda Function Result Received");
    } catch (error) {
      console.error(error);
    }
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
        <div id='simulation-buttons-layout'>
          <button className='button' onClick={() => callLambdaFunction(localStorage.getItem('KinetikDataSet'))}> Start Simulation </button>
          <button className='button' onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
        </div>
        <Slider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          valueLabelDisplay="auto"
          marks={1}
          min={0}
          defaultValue={0}
          max={data.length - 1}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default SimulationModule;
