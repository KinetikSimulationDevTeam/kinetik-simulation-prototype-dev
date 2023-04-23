import React, { useState } from 'react'
import DragDropFile from './DragDropFile'
import Kinetik_template_file from '../InputTemplate/kinetik_template_file.xlsx'

const UploadModule = ({ handleLambdaOutput, handleUploadCount }) => {
  //uploaded file name
  const [fileName, setFileName] = useState();

  //selected time period
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('13');

  //set file name after updating the file
  //in the DragDropModule
  const file = (data) => {
    setFileName(data);
  }

  //handle select option change
  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
  }

  return (
    <div id="upload-module-layout">
      <div id='upload-module-title'>
        <h3 className='title'> Control Panel </h3>
        <a id='upload-module-template-link' href={Kinetik_template_file} target='_blank' download><h5> Download Template </h5></a>
      </div>
      <div id='upload-module-input-layout'>
        <div id='upload-module-select-layout'>
          <select onChange={handleTimePeriodChange} value={selectedTimePeriod}>
            <option value="13">One Quarter</option>
            <option value="26">Half Year</option>
            <option value="52">One Year</option>
          </select>
          <h5 className='title'>File Name: </h5>
          <h5 id='uploadModuleFileName'> {localStorage.getItem('fileName') === undefined ? fileName : localStorage.getItem('fileName')} </h5>
        </div>
        <DragDropFile timePeriod={selectedTimePeriod} handleLambdaOutput={handleLambdaOutput} onAction={file} handleUploadCount={handleUploadCount} />
      </div>
    </div>
  )
}

export default UploadModule
