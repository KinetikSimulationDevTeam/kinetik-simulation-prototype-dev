import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import MyResponsiveBar from './SimulationBarChart';
import { API } from 'aws-amplify';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const SimulationModule = (props) => {
  //This state variable keeps track of the index of the current week being displayed in the simulation module. It is initialized with a default value of 0.
  const [currentIndex, setCurrentIndex] = useState(0);
  //This state variable is used to keep track of the value of the week slider. It is initialized with a default value of 0
  const [sliderValue, setSliderValue] = useState(0);
  //This state variable is used to keep track of whether the simulation is currently playing or not. It is initialized with a default value of false.
  const [isPlaying, setIsPlaying] = useState(false);
  //This state variable is used to keep track of the data that is passed into the bar chart component. It is initialized with a default value of [[]].
  const [data, setData] = useState([[]]);
  //This state variable is used to keep track of the largest value in the lambdaOutput state. It is initialized with a default value of 100.
  const [largestValue, setLargestValue] = useState(100);
  // This state will store the response from the lambda function
  const [lambdaOutput, setLambdaOutput] = useState();

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
  useEffect(() => {
    if (lambdaOutput) {
      setData(lambdaOutput, largestOutput());
    }
  }, [lambdaOutput]);

  /*
    Description: This function calculates the largest value in the lambdaOutput state and sets the largestValue state with that value.

    Arguments: None

    Return Type: None
  */
  async function largestOutput() {
    const maxValue = lambdaOutput
      .flatMap(array => array.map(obj => obj.values))
      .reduce((max, value) => Math.max(max, value), 0);
    await setLargestValue(maxValue);
  }

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
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
      if (currentIndex === data.length - 1) {
        setIsPlaying(false);
      };
    }

    return () => clearInterval(timer);
  }, [currentIndex, data.length, isPlaying]);

  /*
    Description: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.

    Arguments: value (Number): The new value of the slider.

    Return Type: None
  */
  const handleSliderChange = async (value) => {
    await setCurrentIndex(value);
    await setSliderValue(value);
  };

  /*
    Description: This function is called when the "Auto Play" or "Pause" button is clicked and toggles the isPlaying state.

    Arguments: None

    Return Type: None
  */
  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  /*
    Description: This function is called when the newOps sliders are changed and sets the updatedSliderValue state with the new value.

    Arguments: None

    Return Type: None
  */
  useEffect(() => {
    if(localStorage.getItem('KinetikDataSet') != null){
      callLambdaFunction(localStorage.getItem('KinetikDataSet'));
    }
  }, [props.sliderValue]);

  /*
    Description: This function is called when the "Start Simulation" button is clicked and sends a POST request to the getSimulationOutput API endpoint using the input parameter. It then sets the lambdaOutput state with the response.

    Arguments: input (String): The input to send to the API.
    
    Return Type: None
  */
  const callLambdaFunction = async (input) => {
    try {
      let updatedJsonObject = input;
      console.log(props.sliderValue);

      if (props.sliderValue.length != 0) {
        const jsonObject = JSON.parse(updatedJsonObject);
        for (let i = 0; i < jsonObject['means'].length; i++) {
          jsonObject['means'][i] = props.sliderValue[i];
        }
        updatedJsonObject = JSON.stringify(jsonObject);
      }

      const response = await API.post('getSimulationOutput', '/simulation', {
        body: updatedJsonObject
      });

      // Set the state of lambdaOutput with the response
      await setLambdaOutput(response === undefined ? response[0] : response, props.handleLambdaOutput(response === undefined ? response[0] : response));
      alertify.success('Simulation Completed Successfully.');
    } catch (error) {
      alertify.error('Input File is not in correct format.');
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
            <MyResponsiveBar largestValue={largestValue} data={data[currentIndex].slice(0, data[0].length - 2 < 0 ? 0 : data[0].length - 2)} />
          </div>
          <div id='simulation-bar-chart-right'>
            <MyResponsiveBar largestValue={largestValue} data={data[currentIndex].slice(data[0].length - 2 < 0 ? 0 : data[0].length - 2, data[0].length)} />
          </div>
        </div>
        <div id='simulation-buttons-layout'>
          <button className='button' onClick={() => callLambdaFunction(localStorage.getItem('KinetikDataSet'))}> Start Simulation </button>
          <button className='button' onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
        </div>
        <Slider
          id='simulation-slider'
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
