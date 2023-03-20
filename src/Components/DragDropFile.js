import React, { useState } from "react";
import UploadImg from '../Images/UploadImg.png'
import fs, { readFileSync } from 'fs'

// drag drop file component
function DragDropFile({onAction}) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = React.useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      alert(`Selected file - ${e.dataTransfer.files[0].name}`);
      onAction(e.dataTransfer.files[0].name);
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        alert(`Selected file - ${e.dataTransfer.files[0].name}`);
        onAction(e.dataTransfer.files[0].name);
        convertFile(e.convertFile.files)
        // handleFiles(e.dataTransfer.files);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        alert(`Selected file - ${e.target.files[0].name}`);
        onAction(e.target.files[0].name);
        convertFile(e.target.files)
        // handleFiles(e.target.files);
      }
    };
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };

    // reading the file and converting into Json
    const convertFile = (file) => {
      var csv = readFileSync(file)
      // convert the data to string and aplit in array
      var array = csv.toString().split("\r")
      console.log(array)
    }
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <img src={UploadImg} width="50" height="50" alt="" />
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDropFile;
