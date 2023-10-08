import { API } from "aws-amplify";
import alertify from "alertifyjs";

/*
    Description: This function is called when the "Start Simulation" button is clicked and sends a POST request to the getSimulationOutput API endpoint using the input parameter. It then sets the lambdaOutput state with the response.

    Arguments: input (String): The input to send to the API.
    
    Return Type: None
  */
const callLambdaFunction = async ({
  input,
  marketingInput,
  setLambdaOutput,
  setIsLoading,
  sliderValue,
  handleLambdaOutput,
  onClickStartSimulationButton,
}) => {
  try {
    setIsLoading(true);
    let updatedJsonObject = input;

    if (sliderValue.length !== 0) {
      const jsonObject = JSON.parse(updatedJsonObject);
      for (let i = 0; i < jsonObject["sliderValues"].length; i++) {
        jsonObject["sliderValues"][i] = sliderValue[i];
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
      handleLambdaOutput(
        mainSimulationResponse === undefined
          ? mainSimulationResponse[0]
          : mainSimulationResponse
      ),
      setIsLoading(false)
    );
    onClickStartSimulationButton();
  } catch (error) {
    console.log(error);
    alertify.error("Input File is not in correct format.");
    setIsLoading(false);
  }
};

export default callLambdaFunction;
