# React Coponents Documentations

## DragDropFile.js
This is a React functional component that implements a drag-and-drop file upload functionality. The component consists of four major functions:

`DragDropFile`: The main function that handles the drag-and-drop functionality. It sets up state variables that keep track of whether the user is currently dragging a file, as well as the file itself, and it calls a function passed in via props (props.onAction) with the name of the file that was uploaded.

`handleDrag`: A helper function that is called when the user drags a file over the component. It prevents the default behavior of the browser, sets the dragActive state variable to true, and calls props.onAction with the name of the file being dragged. If the user stops dragging over the component, dragActive is set back to false.

`handleDrop`: A helper function that is called when the user drops a file onto the component. It sets dragActive back to false, reads the dropped file, and updates the file state variable to contain the uploaded file. If the props.onAction function is defined, it is called with the name of the file that was uploaded.

`handleChange`: A helper function that is called when the user selects a file using a file input element. It updates the file state variable to contain the uploaded file and calls props.onAction with the name of the file that was uploaded.

Additionally, the component contains a few other helper functions:
`onButtonClick`: A function that is called when the user clicks a button to upload a file. It simply triggers a click event on a hidden file input element.

`handleOnSubmit`: A function that is called when the user submits the file. If a file has been uploaded, it reads the file and parses it into a JSON object using the csvFileToArray function. If the props.onAction function is defined, it is called with the JSON object. If no file has been uploaded, an error message is displayed using the alertify library.

`csvFileToArray`: A function that takes a CSV-formatted string as input and parses it into a JSON object. The JSON object consists of several arrays containing data on sources, stages, mean and standard deviation, and operation probabilities.

## NavBar.js
The Navbar component is a React functional component that renders a navigation bar with a logo and links to different pages.

### Props
The Navbar component does not accept any props.

### Explanation
To use the Navbar component in your React application, you need to import it into your component and render it within your component.

This React component is responsible for rendering a navigation bar. It imports the React library and an image of the Kinetik logo from a file named Kinetik_logo.png.

The Navbar component is defined as a functional component using an arrow function. When the component is called, it returns a nav element with an ID of "nav-bar" and three `a` elements that represent the navigation links.

The first `a` element is an image of the Kinetik logo that is wrapped in an anchor tag, which is not functional in this case. The image is displayed with a width and height of 30 pixels.

The second `a` element represents the Home link, which is highlighted as the current page. The anchor tag has an ID of "home-link" and a class of "link". The span element inside the a tag is used to display the current page indication.

The third `a` element represents the About link and it redirects to https://www.kinetiksimulation.com website. The target attribute of the a tag is set to _blank to open the link in a new tab.

Finally, the export default statement at the end of the file exports the Navbar component to be used in other files.

## NewOpsModule.js
This React component is responsible for rendering a new operational module. It imports the React library, useEffect, useState, and a component named ScenerioSliders from a file named ScenerioSliders.js.

The `NewOpsModule` component is defined as a functional component using an arrow function. When the component is called, it returns a div element with an ID of "new-ops-module-layout", containing a h3 element with a class of "title" and a ScenerioSliders component.

The `useState` hook is used to define two state variables: sliderValue and uploadCount. `sliderValue` is an empty array that will be used to store the response from the lambda function. uploadCount is set to zero and updated using the useEffect hook with the `props.uploadCount` value.

The `handleSliderValue` function is an asynchronous function that takes data as a parameter. It is used to call the lambda function to get data for the simulation module. It then updates the `sliderValue` state using the `setSliderValue` function and passes the value to the props.handleSliderValue function.

Finally, the export default statement at the end of the file exports the NewOpsModule component to be used in other files.

## ScenarioSlider.js
This React component is responsible for rendering a scenario slider. It imports the React library, `useState` hook, and a component named `ReactSlider` from the react-slider library.

The `ScenerioSlider` component is defined as a functional component using an arrow function. It takes three props as arguments: name, mean, and onSliderChange. name and mean are used to display the name of the slider and its mean value, respectively. onSliderChange is a callback function that is called when the user changes the value of the slider.

The `useState` hook is used to define a state variable named value. It is set to the mean value passed as a `prop` and will be used to store the current value of the slider.

The `handleSliderChange` function is used to update the value state when the user changes the value of the slider. It takes `newValue` as a parameter, sets the value state to newValue, and then calls the `onSliderChange` callback function with the `newValue` as an argument.

The return statement returns a div element containing the name and mean values of the slider, a `ReactSlider` component with custom styling, and the value of the slider displayed below it.

Finally, the export default statement at the end of the file exports the ScenerioSlider component to be used in other files.

## ScenarioSliders.js
This component is a React component that displays a set of sliders that allow the user to set values for different sources. The component reads the data from local storage and displays a slider for each source in the data. The user can move the sliders to set the values and then click a "Confirm" button to save the changes.

### Props
The component takes the following props:
handleSliderValue: A callback function that will be called with the slider values when the user clicks the "Confirm" button.
uploadCount: A prop used to trigger the useEffect hook when the file is uploaded.

### Explanation
The first line imports the React library, along with the useState and useEffect hooks. The second line imports another React component called ScenerioSlider from a local file.

The component defines two state variables: "data" and "sliderValue". The "data" state stores the response from the lambda function, which is initialized to null. The "sliderValue" state stores the current value of the slider and is initialized to an empty array.

The component uses two useEffect hooks. The first useEffect hook is called whenever the "props.uploadCount" property changes. This hook calls a function named "refreshPage", which retrieves data from local storage and updates the "data" state variable. If the data exists, it calls the "change" function to update the "sliderValue" state variable and also passes it to the parent component using the "props.handleSliderValue" function.

The second useEffect hook is called when the component mounts for the first time. This hook calls the "refreshPage" function, which retrieves data from local storage and updates the "data" state variable.

The component also defines two functions: "onClicked" and "handleSliderChange". The "onClicked" function is called when the "Confirm" button is clicked and passes the current value of the "sliderValue" state variable to the parent component using the "props.handleSliderValue" function. The "handleSliderChange" function is called when the value of a slider is changed, and it updates the "sliderValue" state variable accordingly.

The component conditionally renders either a message asking the user to upload a file or a set of sliders based on the "data" state variable. If "data" is null, the component returns a message to the user asking them to upload a file. Otherwise, the component generates a set of sliders based on the "data" state variable and returns them along with a "Confirm" button. Each slider is created using the ScenerioSlider component, and its initial value is set to the corresponding value in the "data" state variable. Whenever a slider is changed, the "handleSliderChange" function is called to update the "sliderValue" state variable.

## Scoreboard.js
This is a React functional component that exports a component called "Scoreboard". It imports the React module and two hooks, useState and useEffect, as well as another component called "MyResponsiveScoreBoard" from a local file named "ScoreboardBarChart".

The Scoreboard component takes in a single prop called "lambdaOutput", which is used to render a bar chart component. The component has an initial state value of an empty array, which is used to keep track of the filtered data that is passed into the bar chart component.

The useEffect hook is used to parse the data received from the lambda function (if it exists) and set the filteredData state to the appropriate values that will be passed into the MyResponsiveScoreBoard component. The useEffect hook is only called when the lambdaOutput prop changes.

The render function returns a div element that contains a title and the MyResponsiveScoreBoard component with the filteredData passed in as a prop.

## ScoreboardBarChart.js & SimulationBarChart.js
The MyResponsiveScoreBoard component is a wrapper around the ResponsiveBar component provided by the @nivo/bar library, which renders a bar chart that displays information about the results of a competition, divided by stages.

### Props
#### `data` (required): An array of objects representing the data to be displayed in the chart.
Each object should have the following properties:
`Stage`: a string representing the stage of the competition
values: a number representing the number of opportunities at that stage.

`keys` (required): An array of strings representing the keys used to access the data values in the data objects. In this case, it is an array with a single string value of values.

`indexBy` (required): A string representing the property of the data objects that should be used as the index of the chart.

#### `margin`:An object representing the margins of the chart.
It has the following properties:
`top`: number representing the top margin.

`right`: number representing the right margin.

`bottom`: number representing the bottom margin.

`left`: number representing the left margin.

`padding`: number representing the padding between the bars.

#### `valueScale`: An object representing the scale used to display the values.
It has the following properties:
`type`: a string representing the type of scale. In this case, it is set to 'linear'.

#### `indexScale`: An object representing the scale used to display the index values.
It has the following properties:
`type`: a string representing the type of scale. In this case, it is set to 'band'.

`round`: a boolean indicating whether to round the scale.

#### `colors`: An object representing the colors used in the chart.
It has the following properties:
`scheme`: a string representing the color scheme. In this case, it is set to 'nivo'.

`colorBy`: A string representing the property used to determine the color of the bars.

#### `defs`: An array of objects representing the definitions used for pattern fills.
Each object should have the following properties:
`id`: a string representing the ID of the pattern fill.

`type`: a string representing the type of pattern fill.

`background`: a string representing the background color of the pattern fill.

`color`: a string representing the color of the pattern fill.

`size`: a number representing the size of the pattern fill.

`padding`: a number representing the padding of the pattern fill.

`stagger`: a boolean indicating whether to stagger the pattern fill.

#### `fill`: An array of objects representing the pattern fills to use for each data value.
Each object should have the following properties:
`match`: an object representing the criteria for which the pattern fill should be used.

`id`: a string representing the ID of the pattern fill to use.

#### `borderColor`:An object representing the border color of the bars.
It has the following properties:
`from`: a string representing the source of the color. In this case, it is set to 'color'.

`modifiers`: an array of arrays representing the modifiers to apply to the color. In this case, it is set to [['darker', 1.6]].

`minValue`: A number representing the minimum value to display on the y-axis.

`enableGridX`:A boolean indicating whether to enable the x-axis grid.

`axisTop`: An object representing the properties of the top axis.

`axisRight`:An object representing the properties of the right axis.

`axisBottom`:An object representing the properties of the bottom.

## SimulationModule.js
The file SimulationModule.js is a React component that displays a simulation module containing a slider and a bar chart component. The component fetches data from an API and renders the data in the form of a bar chart. The bar chart displays data for different weeks of a simulation, and the slider allows the user to navigate between the different weeks.

The component uses several state variables to keep track of the current state of the simulation. The state variables are as follows:

`currentIndex`: This state variable keeps track of the index of the current week being displayed in the simulation module. It is initialized with a default value of 0.
`sliderValue`: This state variable is used to keep track of the value of the week slider. It is initialized with a default value of 0.
`isPlaying`: This state variable is used to keep track of whether the simulation is currently playing or not. It is initialized with a default value of false.
`data`: This state variable is used to keep track of the data that is passed into the bar chart component. It is initialized with a default value of `[[]]`.
`largestValue`: This state variable is used to keep track of the largest value in the `lambdaOutput` state. It is initialized with a default value of 100.
`lambdaOutput`: This state variable will store the response from the lambda function.

The component uses several functions to update the state variables and fetch data from the API. The functions are as follows:
`useEffect`: This function is used to make a call to the lambda function to get the data for the simulation module. It is called when the component is first rendered.
Arguments: None
Return Type: None

`largestOutput`: This function calculates the largest value in the lambdaOutput state and sets the largestValue state with that value.
Arguments: None
Return Type: None

`useEffect`: This function is used to update the state variables when the simulation is playing. It is called when the currentIndex, data.length, or isPlaying state variables change.
Arguments: None
Return Type: None

`handleSliderChange`: This function is called when the slider is moved and sets the currentIndex and sliderValue states with the new value.
Arguments: value (Number): The new value of the slider.
Return Type: None

`togglePlay`: This function is called when the "Auto Play" or "Pause" button is clicked and toggles the isPlaying state.
Arguments: None
Return Type: None

`useEffect`: This function is used to call the lambda function when the props.sliderValue state changes.
Arguments: None
Return Type: None

`callLambdaFunction`: This function is called when the "Start Simulation" button is clicked and sends a POST request to the getSimulationOutput API endpoint using the input parameter. It then sets the lambdaOutput state with the response.
Arguments: input (String): The input to send to the API.
Return Type: None

The component also imports several modules and components that are used in the simulation module. These are as follows:
`React`: The main React library.
`useState`: A React hook that allows the component to use state variables.
`useEffect`: A React hook that allows the component to perform side effects.
`Slider`: A React component that provides a slider for the simulation module.
`MyResponsiveBar`: A custom React component that displays a responsive bar chart based on the data passed to it.
`Button`: A React component that provides a button for the simulation module.
`Grid`: A React component that provides a grid layout for the simulation module.
`Typography`: A React component that provides a typography for the simulation module.
`CircularProgress`: A React component that provides a circular progress bar for the simulation module.

## UploadModule.js
The UploadModule.js file is a React component that displays a control panel for uploading files and selecting a time period. The component imports DragDropFile.js and a template file called kinetik_template_file.xlsx.

The component has three state variables declared using the useState hook:
`fileName`: This state variable keeps track of the name of the uploaded file.
`selectedTimePeriod`: This state variable keeps track of the selected time period from a dropdown menu. It is initialized with a default value of '13'.
`file`: This state variable is a function that updates the fileName state variable after a file is uploaded.

The component also has two functions:
`handleTimePeriodChange`: This function is called when the user selects a different time period from the dropdown menu. It updates the selectedTimePeriod state variable to the selected value.
`file`: This function is called when a file is uploaded using the DragDropFile component. It updates the fileName state variable with the uploaded file name.

The component renders a control panel with two sections:
The first section displays the title of the control panel and a link to download the template file.
The second section displays a dropdown menu to select the time period, the uploaded file name, and the DragDropFile component.

The DragDropFile component takes in the selectedTimePeriod, handleLambdaOutput, onAction, and handleUploadCount as props. The handleLambdaOutput and handleUploadCount functions are called when the file is uploaded or an action is taken.

## MainFrame.js
This file contains the main layout of the Kinetik Simulation web application. It imports several components and defines their placement in the layout. It also defines several state variables and functions that are used by the child components.

### Imports
The following components are imported at the top of the file:
`React` is the core library for building UI components in React.
`SimulationModule` is a custom component that contains the logic for the simulation of the Kinetik model.
`UploadModule` is a custom component that handles the uploading of files and selection of time periods for the simulation.
`useState` and `useEffect` are hooks provided by React for managing state and side effects in functional components.
`NewOpsModule` is a custom component that allows the user to adjust operational parameters for the simulation.
`Scoreboard` is a custom component that displays the results of the simulation.
`alertify` is a library for displaying alert messages to the user.
`Navbar` is a custom component that contains the navigation bar for the application.
State variables

The following state variables are defined using the useState hook:
`lambdaOutput`: stores the response from the Lambda function.
`sliderValue`: stores the values of the sliders in the NewOpsModule.
`uploadCount`: stores the number of times a file has been uploaded using the UploadModule.

### Functions
The following functions are defined in the file:
`handleLambdaOutput`: a function that sets the value of the lambdaOutput state variable.
`handleSliderValue`: a function that sets the value of the sliderValue state variable.
`handleUploadCount`: a function that increments the value of the uploadCount state variable.

### Side effects
The useEffect hook is used to display a welcome message to the user when they first open the application, if no data has been uploaded yet.

### Layout
The MainFrame component defines the main layout of the application. It contains two main columns, each of which contains two custom components. The left column contains the UploadModule and NewOpsModule, while the right column contains the SimulationModule and Scoreboard. The Navbar component is placed at the top of the page.
