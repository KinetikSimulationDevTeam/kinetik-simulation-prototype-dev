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
    { value: "13", label: "One Quarter" },
    { value: "26", label: "Half Year" },
    { value: "52", label: "One Year" },
  ]

  return (
    <div id="upload-module-layout">
      <div id='upload-module-title'>
        <h3 className='title'> Control Panel </h3>
        <a id='upload-module-template-link' href="https://docs.google.com/spreadsheets/d/1BFe5Zd3hNXDDj_UhxXslOETMXakupOt3WtGcI0YQkro/template/preview" target='_blank'><h5> Input File Template </h5></a>
      </div>
      <div id='upload-module-input-layout'>
        <div id='upload-module-select-layout'>
          <CreatableSelect placeholder="Type weeks or select..." options={dropdownOptions} className='upload-module-input-dropdown' onChange={(choice) => handleTimePeriodChange(choice)} />
          <h5 id='upload-file-name-layout'>File Name: </h5>
          <p id='uploadModuleFileName'> {localStorage.getItem('fileName') === undefined ? fileName : localStorage.getItem('fileName')} </p>
        </div>
        <FileUplaod timePeriod={selectedTimePeriod} handleLambdaOutput={handleLambdaOutput} onAction={file} handleUploadCount={handleUploadCount} />
      </div>
    </div>
  )
}

export default UploadModule
