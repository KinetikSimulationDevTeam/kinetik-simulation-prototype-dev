import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import CsvMaker from "../Components/SimulationComponents/CsvMaker";
import downloadCsv from "../Components/SimulationComponents/DownloadCsv";
import SimulationTitle from "../Components/SimulationComponents/SimulationTitle";
import SimulationChart from "../Components/SimulationComponents/SimulationChart";
import SimulationButtons from "../Components/SimulationComponents/SimulationButtons";
import SimulationControl from "../Components/SimulationComponents/SimulationControl";
import SimulationBackDrop from "../Components/SimulationComponents/SimulationLoadingIndicator";

/*
    Description: This component is used to display the simulation module.

    Arguments: props: the data that is passed into the bar chart component

    Return Type: None
*/
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
  // This state will store the key for the chord diagram
  const [chordKey, setChordKey] = useState([]);
  // This state will store the data for the chord diagram
  const [chordData, setChordData] = useState(false);
  // This state will store the current user graph selection
  const [graphSelection, setGraphSelection] = useState("bar-chart");
  // This state will be true if the app is waiting for a response from the lambda function
  const [isLoading, setIsLoading] = useState(false);
  // This state will be true if the start simulation button is flashing
  const [startSimulationButtonFlash, setStartSimulationButtonFlash] = useState(
    props.startSimulationButtonFlashing
  );
  // This state store the current playback speed
  const [playbackSpeed, setPlaybackSpeed] = useState(200);

  /*
    Description: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.

    Arguments: None

    Return Type: None
  */
  useEffect(() => {
    if (lambdaOutput) {
      setData(
        lambdaOutput.map((array) => array.slice(0, -5)),
        largestOutput()
      );

      setChordData(lambdaOutput.map((array) => array.slice(-1)));
      setChordKey(data[0].map((obj) => obj.Stage));
    }
  }, [lambdaOutput]);

  /*
    Description: This function calculates the largest value in the lambdaOutput state and sets the largestValue state with that value.

    Arguments: None

    Return Type: None
  */
  async function largestOutput() {
    // Filter out the last 3 stages for the largest value calculation in y-axis
    const lambdaOutputWithoutLastStages = lambdaOutput.map((array) =>
      array.slice(0, -5)
    );

    const maxValue = lambdaOutputWithoutLastStages
      .flatMap((array) => array.map((obj) => obj.values))
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
      }, playbackSpeed); // Use the playbackSpeed state here
      if (currentIndex === data.length - 1) {
        setIsPlaying(false);
      }
    }

    return () => clearInterval(timer);
  }, [currentIndex, data.length, isPlaying, playbackSpeed]);

  const increasePlaybackSpeed = () => {
    setPlaybackSpeed((prevSpeed) => prevSpeed / 2);
  };

  const decreasePlaybackSpeed = () => {
    setPlaybackSpeed((prevSpeed) => prevSpeed * 2);
  };

  /*
    Description: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.

    Arguments: value (Number): The new value of the slider.

    Return Type: None
  */
  const handleSliderChange = async (event, newValue) => {
    await setCurrentIndex(newValue);
    await setSliderValue(newValue);
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
    if (localStorage.getItem("KinetikDataSet") != null) {
      callLambdaFunction(
        localStorage.getItem("KinetikDataSet"),
        localStorage.getItem("marketingInputFile") === null
          ? null
          : localStorage.getItem("marketingInputFile")
      );
    }
  }, [props.sliderValue]);

  /*
    Description: This function is called when the "Start Simulation" button is clicked and sends a POST request to the getSimulationOutput API endpoint using the input parameter. It then sets the lambdaOutput state with the response.

    Arguments: input (String): The input to send to the API.
    
    Return Type: None
  */
  const callLambdaFunction = async (input, marketingInput) => {
    try {
      setIsLoading(true);
      let updatedJsonObject = input;

      if (props.sliderValue.length !== 0) {
        const jsonObject = JSON.parse(updatedJsonObject);
        for (let i = 0; i < jsonObject["sliderValues"].length; i++) {
          jsonObject["sliderValues"][i] = props.sliderValue[i];
        }
        updatedJsonObject = JSON.stringify(jsonObject);
      }

      const mainSimulationResponse = await API.post(
        "getSimulationOutput",
        "/simulation",
        {
          body: updatedJsonObject,
        }
      );

      if (marketingInput !== "null") {
        console.log("marketingInput", marketingInput);

        const marketingInputFileResponse = await API.post(
          "getSimulationOutput",
          "/kinetikSimulationMarketingInputFileAlgorithm-dev",
          {
            body: marketingInput,
          }
        );

        console.log("marketingInputFileResponse", marketingInputFileResponse);
      }

      // Set the state of lambdaOutput with the mainSimulationResponse
      await setLambdaOutput(
        mainSimulationResponse === undefined
          ? mainSimulationResponse[0]
          : mainSimulationResponse,
        props.handleLambdaOutput(
          mainSimulationResponse === undefined
            ? mainSimulationResponse[0]
            : mainSimulationResponse
        ),
        setIsLoading(false)
      );
      props.onClickStartSimulationButton();
    } catch (error) {
      console.log(error);
      alertify.error("Input File is not in correct format.");
      setIsLoading(false);
    }
  };

  const getChordDataForCurrentIndex = () => {
    if (
      chordData &&
      chordKey &&
      chordData.length > currentIndex &&
      Array.isArray(chordData[currentIndex])
    ) {
      return chordData[currentIndex][0]?.values ?? [];
    }
    return [];
  };

  const handleGraphSelection = () => {
    if (graphSelection === "bar-chart") {
      setGraphSelection("chord-chart");
    } else {
      setGraphSelection("bar-chart");
    }
  };

  useEffect(() => {
    setStartSimulationButtonFlash(props.startSimulationButtonFlashing);
  }, [props.startSimulationButtonFlashing]);

  const onClickExportScenario = async () => {
    const csvData = await CsvMaker(lambdaOutput, props.sliderValue);
    await downloadCsv(csvData, "scenario.csv");
  };

  return (
    <div id="simulation-module-layout">
      <SimulationTitle
        currentIndex={currentIndex}
        graphSelection={graphSelection}
        handleGraphSelection={handleGraphSelection}
      />

      <SimulationChart
        graphSelection={graphSelection}
        data={data}
        currentIndex={currentIndex}
        largestValue={largestValue}
        chordData={chordData}
        chordKey={chordKey}
        getChordDataForCurrentIndex={getChordDataForCurrentIndex}
      />

      <SimulationButtons
        onClickExportScenario={onClickExportScenario}
        startSimulationButtonFlash={startSimulationButtonFlash}
        callLambdaFunction={callLambdaFunction}
      />

      <SimulationControl
        decreasePlaybackSpeed={decreasePlaybackSpeed}
        increasePlaybackSpeed={increasePlaybackSpeed}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        sliderValue={sliderValue}
        handleSliderChange={handleSliderChange}
        data={data}
      />

      <SimulationBackDrop isLoading={isLoading} />
    </div>
  );
};

export default SimulationModule;
