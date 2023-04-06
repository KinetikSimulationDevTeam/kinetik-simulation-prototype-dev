import React, { useState } from 'react'
import DragDropFile from './DragDropFile'

const UploadModule = ({ handleLambdaOutput }) => {
  //uploaded file name
  const [fileName, setFileName] = useState();

  //set file name after updating the file
  //in the DragDropModule
  const file = (data) => {
    setFileName(data);
  }
  return (
    <div id="upload-module-layout">
      <h3 className='title'> Control Panel </h3>
      <div id='upload-module-input-layout'>
        <div id='upload-module-select-layout'>
          <select>
            <option value="weekly">Weekly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <h5 className='title'>File Name: </h5>
          <h5 id='uploadModuleFileName'> {fileName} </h5>
        </div>
        <DragDropFile handleLambdaOutput={handleLambdaOutput} onAction={file} />
      </div>
    </div>
  )
}

export default UploadModule
