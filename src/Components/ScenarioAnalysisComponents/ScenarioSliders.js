import React, { useState, useEffect } from "react";
import ScenerioSlider from "./ScenarioSlider";
import alertify from "alertifyjs";

/*
    Description: This component is used to display the sliders for the scenerio analysis.

    Arguments: handleSliderValue: callback function to update the state in ScenerioSliders

    Return Type: None

    Note: This component is used in Simulation.js
*/
const ScenerioSliders = (props) => {
  // This state will store the response from the lambda function
  const [data, setData] = useState(null);
  // This state will store the value of the slider
  const [sliderValue, setSliderValue] = useState([0, 0, 0, 0, 0, 0]);
  // This state will set the confirm times
  const [confirmTimes, setConfirmTimes] = useState(false);
  const [previousSliderValue, setPreviousSliderValue] = useState([
    0, 0, 0, 0, 0, 0,
  ]);
  const [confirmCount, setConfirmCount] = useState(true);

  useEffect(() => {
    const refreshPage = () => {
      const jsonData = JSON.parse(localStorage.getItem("KinetikDataSet"));
      setData(jsonData);
    };

    refreshPage();
  }, [props.uploadCount]);

  /*
    Description: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.
    
    Arguments: None

    Return Type: None
  */
  function onClicked() {
    props.handleSliderValue(sliderValue);
    if (confirmTimes === false) {
      setConfirmTimes(true);
      alertify.alert(
        "Verify",
        "Please click Confirm again to confirm your selection."
      );
    } else {
      if (confirmCount) {
        setPreviousSliderValue(sliderValue);
        setConfirmCount(false);
      } else {
        setConfirmCount(true);
      }
      setConfirmTimes(false);
      alertify.success("New Values Confirmed! Simulation will now re-run.");
    }
  }

  /*
    Description: This function is used to get the data from the local storage when the page refresh and set the data state with that data.

    Arguments: None

    Return Type: None
  */
  const refreshPage = async () => {
    const jsonData = JSON.parse(localStorage.getItem("KinetikDataSet"));
    await setData(jsonData);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  const handleSliderChange = async (newValue, index, currentValue) => {
    const newValues = [...currentValue];
    newValues[index] = newValue * 0.01;
    await setSliderValue(newValues);
  };

  /*
    Description: This function is called when the Reset button is clicked and sets the sliderValue state to its initial state.

    Arguments: None

    Return Type: None
  */
  const onResetClicked = () => {
    if (sliderValue === previousSliderValue) {
      alertify.alert(
        "Warning",
        "Sliders are already at their previous values."
      );
      return;
    }
    setSliderValue(previousSliderValue);
    setConfirmTimes(false);
    alertify.success("Sliders have been reset to their previous values.");
  };

  if (!data) {
    return (
      <div>
        <p style={{ textAlign: "left" }}>Please Upload a File Above</p>
        <p style={{ textAlign: "left" }}>
          For the template input file, kindly refer to the link adjacent to the
          control panel
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ height: "100%", overflow: "auto" }}>
        <ScenerioSlider
          name="Leads (TBD)"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 0, sliderValue)
          }
          sliderValue={sliderValue[0]}
        />
        <ScenerioSlider
          name="Opportunities"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 1, sliderValue)
          }
          sliderValue={sliderValue[1]}
        />
        <ScenerioSlider
          name="Progression"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 2, sliderValue)
          }
          sliderValue={sliderValue[2]}
        />
        <ScenerioSlider
          name="Closing"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 3, sliderValue)
          }
          sliderValue={sliderValue[3]}
        />
        <ScenerioSlider
          name="Win Rate"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 4, sliderValue)
          }
          sliderValue={sliderValue[4]}
        />
        <ScenerioSlider
          name="Market Dynamics"
          mean={0}
          onSliderChange={(newValue) =>
            handleSliderChange(newValue, 5, sliderValue)
          }
          sliderValue={sliderValue[5]}
        />
        <div id="scenario-buttons">
          <button className="button" type="submit" onClick={onClicked}>
            {" "}
            Confirm{" "}
          </button>
          <button className="button" type="submit" onClick={onResetClicked}>
            {" "}
            Previous Values{" "}
          </button>
        </div>
      </div>
    );
  }
};

export default ScenerioSliders;
