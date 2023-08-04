import React, { useState } from 'react'
import FileUplaod from '../Components/ControlPanelComponents/FileUpload'
import CreatableSelect from 'react-select/creatable';

/*
    Description: This component is used to display the control panel.

    Arguments: handleLambdaOutput: callback function to update the state in Simulation.js

              handleUploadCount: callback function to update the state in Simulation.js
                
    Return Type: None
*/
const UploadModule = ({ handleLambdaOutput, handleUploadCount }) => {
  //uploaded file name
  const [fileName, setFileName] = useState();

  //selected time period
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('52');

  //set file name after updating the file
  //in the FileUplaod component
  const file = (data) => {
    setFileName(data);
  }

  //handle select option change
  const handleTimePeriodChange = (choice) => {
    setSelectedTimePeriod(choice.value.toString());
    console.log(choice.value);
  }

  const dropdownOptions = [
    { value: "26", label: "1/2 Year" },
    { value: "52", label: "1 Year" },
    { value: "104", label: "2 Years" },
    { value: "156", label: "3 Years" },
  ]

  return (
    <div id="upload-module-layout">
      <div id='upload-module-left-section'>
        <h3 className='title'> Control Panel </h3>
        <CreatableSelect placeholder="Type weeks or select..." options={dropdownOptions} className='upload-module-input-dropdown' onChange={(choice) => handleTimePeriodChange(choice)} />
        <p id='uploadModuleFileName'> File Name: {localStorage.getItem('fileName') === undefined ? fileName : localStorage.getItem('fileName')} </p>
      </div>
      <FileUplaod timePeriod={selectedTimePeriod} handleLambdaOutput={handleLambdaOutput} onAction={file} handleUploadCount={handleUploadCount} />
    </div>
  )
}

export default UploadModule
